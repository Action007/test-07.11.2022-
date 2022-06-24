import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import { checklistAPI } from "../../../services/checklistService";
import CreationChecklistItems from "../CreationChecklistItems/CreationChecklistItems";
import CreationChecklistPreview from "../CreationChecklistPreview/CreationChecklistPreview";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import CreationTags from "../CreationTags/CreationTags";
import PopupCreateDone from "../PopupCreateDone/PopupCreateDone";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import CreationCategory from "../CreationCategory/CreationCategory";
import validateLink from "../../../utils/validateLink";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import "./CreationOfChecklist.scss";

import { ReactComponent as CreationImg } from "../../../assets/images/content/creationChecklist.svg";
import { ReactComponent as AddItemSvg } from "../../../assets/images/icon/addItem.svg";

const CreationOfChecklist = ({ page = false, id, checklists = true }) => {
  const [
    createChecklist,
    { isSuccess: successCreate, error: errorCreate, isLoading: loadingCreate },
  ] = checklistAPI.useCreateChecklistMutation();
  const [
    updateChecklist,
    { isSuccess: successUpdate, error: errorUpdate, isLoading: loadingUpdate },
  ] = checklistAPI.useUpdateChecklistMutation();
  const [preview, setPreview] = useState(false);
  const [validButton, setValidButton] = useState();
  const [done, setDone] = useState(false);
  const [tagsValid, setTagsValid] = useState(true);
  const validateAfterSubmit = useSelector(
    (state) => state.createChecklistReducer.validateAfterSubmit
  );
  const checklist_items = useSelector(
    (state) => state.createChecklistReducer.checklist_items
  );
  const title = useSelector(
    (state) => state.createChecklistReducer.title.value
  );
  const titleIsValid = useSelector(
    (state) => state.createChecklistReducer.title.isValid
  );
  const tags = useSelector((state) => state.createChecklistReducer.tags);
  const categoryValue = useSelector(
    (state) => state.createChecklistReducer.category.value
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t: translate } = useTranslation();
  const breadcrumbs = [{ title: translate("creationOfChecklist.title") }];

  useEffect(() => {
    dispatch(createChecklistActions.onSubmitClear());
  }, [pathname]);

  useEffect(() => {
    const tagsIsValid = tags.length > 2;
    const isDescriptionValid = checklist_items.findIndex(
      (item) =>
        item.description.trim().length < 10 ||
        item.description.trim().length > 150
    );
    const isLinksValid = checklist_items.findIndex((item) =>
      item.value?.link ? validateLink(item.value.link) : true
    );
    const isValidTitle = title.trim().length > 9 && title.trim().length < 151;
    const categoryIsValid = categoryValue !== "" && categoryValue !== false;

    const validOrNot =
      checklist_items.length &&
      isDescriptionValid &&
      isValidTitle &&
      tagsIsValid &&
      !isLinksValid &&
      categoryIsValid;

    setValidButton(!!validOrNot);
  }, [tags, title, checklist_items, categoryValue]);

  useEffect(() => {
    if (successCreate || successUpdate) {
      dispatch(createChecklistActions.onSubmitClear());
      setDone(true);
    } else if (errorCreate || errorUpdate) {
      navigate("/error");
    }
  }, [successCreate, successUpdate, errorCreate, errorUpdate]);

  const checkValidHandler = (e) => {
    if (e) e.preventDefault();
    const tagsIsValid = tags.length > 2;
    const isDescriptionValid = checklist_items.findIndex(
      (item) =>
        item.description.trim().length < 10 ||
        item.description.trim().length > 150
    );
    const isLinksValid = checklist_items.findIndex((item) =>
      item.value?.link ? validateLink(item.value.link) : true
    );
    const isValidTitle = title.trim().length > 9 && title.trim().length < 151;
    const categoryIsValid = categoryValue !== "" && categoryValue !== false;
    setTagsValid(tagsIsValid);
    if (!checklist_items.length) {
      dispatch(createChecklistActions.addChecklist());
    }
    dispatch(createChecklistActions.isValidDescription());
    dispatch(createChecklistActions.isTitleValid());
    dispatch(createChecklistActions.setValidateAfterSubmit());
    if (!categoryIsValid) dispatch(createChecklistActions.addCategory(""));

    const validOrNot =
      checklist_items.length &&
      isDescriptionValid &&
      isValidTitle &&
      tagsIsValid &&
      !isLinksValid &&
      categoryIsValid;

    return !!validOrNot;
  };

  const changeTitleHandler = (e) => {
    const { value } = e.target;
    dispatch(createChecklistActions.addTitle(value));
    if (validateAfterSubmit) dispatch(createChecklistActions.isTitleValid());
  };

  const onClickPreviewHandler = () => {
    if (!checkValidHandler(false)) return;
    setPreview(true);
  };

  const onSubmitHandler = (e) => {
    if (!checkValidHandler(e)) return;
    let checklistBody = {};
    const tags_new = [];
    const tag_ids = [];
    const checklist_items_attributes = [];

    checklist_items.forEach(({ description, list_type, value }) => {
      if (value.link || value.image) {
        checklist_items_attributes.push({
          list_type,
          description,
          value,
        });
      } else if (value.coordinates) {
        checklist_items_attributes.push({
          list_type,
          description,
          value,
        });
      } else {
        checklist_items_attributes.push({
          list_type: "text",
          description,
        });
      }
    });

    tags.forEach((item) =>
      item.tags_new ? tags_new.push(item.name) : tag_ids.push(item.id)
    );

    if (id) {
      if (tags_new.length && tag_ids.length) {
        checklistBody = {
          name: title,
          tag_ids,
          tags_new,
          checklist_items_attributes,
          category_ids: [categoryValue],
          id,
        };
      } else if (tags_new.length) {
        checklistBody = {
          name: title,
          tags_new,
          checklist_items_attributes,
          category_ids: [categoryValue],
          id,
        };
      } else if (tag_ids.length) {
        checklistBody = {
          name: title,
          tag_ids,
          checklist_items_attributes,
          category_ids: [categoryValue],
          id,
        };
      }
    } else if (!id) {
      if (!!tags_new.length && !!tag_ids.length) {
        checklistBody = {
          name: title,
          tag_ids,
          tags_new,
          checklist_items_attributes,
          category_ids: [categoryValue],
        };
      } else if (tags_new.length) {
        checklistBody = {
          name: title,
          tags_new,
          checklist_items_attributes,
          category_ids: [categoryValue],
        };
      } else if (tag_ids.length) {
        checklistBody = {
          name: title,
          tag_ids,
          checklist_items_attributes,
          category_ids: [categoryValue],
        };
      }
    }

    if (!page) createChecklist(checklistBody);
    if (page === "edit-checklist") updateChecklist(checklistBody);
  };

  return (
    <>
      <div className="container creation pb-8">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h2 className="creation__title SFPro-600">
          {translate("creationOfChecklist.title")}
        </h2>
        <div className="creation__wrapper">
          {checklists ? (
            <div className="creation__wrap">
              <h3 className="creation__head SFPro-700">
                {translate("creationOfChecklist.name")}
              </h3>
              <span
                className={`creation__span${!titleIsValid ? " invalid" : ""}`}
              >
                {translate("creationOfChecklist.max")}
              </span>
              <form className="creation__form">
                <label
                  className={`creation__name${!titleIsValid ? " invalid" : ""}`}
                  htmlFor="creationID"
                >
                  <input
                    onChange={(e) => changeTitleHandler(e)}
                    value={title}
                    type="text"
                    id="creationID"
                  />
                </label>
                <div className="creation__inner">
                  <div className="creation__box">
                    <h3 className="creation__head SFPro-700">
                      {translate("creationOfChecklist.points")}
                    </h3>
                    {translate("creationOfChecklist.text")}
                  </div>
                  <button
                    onClick={() =>
                      dispatch(createChecklistActions.addChecklist())
                    }
                    className="creation__add SFPro-600"
                    type="button"
                  >
                    <AddItemSvg />
                    {translate("creationOfChecklist.addBtn")}
                  </button>
                </div>
                {!!checklist_items.length && (
                  <CreationChecklistItems checklist_items={checklist_items} />
                )}
                <h3 className="creation__head SFPro-700">
                  {translate("creationOfChecklist.tags")}
                </h3>
                <span
                  className={`creation__desc${
                    !tagsValid && validateAfterSubmit ? " invalid" : ""
                  }`}
                >
                  {translate("creationOfChecklist.desc")}
                </span>
                <CreationTags
                  tagsValid={tagsValid}
                  setTagsValid={setTagsValid}
                />
                <CreationCategory />
                <div className="creation__buttons SFPro-600">
                  <button
                    onClick={() => onClickPreviewHandler(false)}
                    className={`creation__button${
                      !validButton ? " invalid" : ""
                    }`}
                    type="button"
                  >
                    {translate("creationOfChecklist.preview")}
                  </button>
                  <button
                    onClick={(e) => onSubmitHandler(e)}
                    className={`creation__button${
                      !validButton ? " invalid" : ""
                    }`}
                    type="button"
                  >
                    {translate("creationOfChecklist.publish")}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <LoadingSpinner />
          )}
          <div className="creation__img">
            <CreationImg />
          </div>
        </div>
      </div>
      <CreationChecklistPreview
        onHide={() => setPreview(false)}
        show={preview}
      />
      <PopupCreateDone show={done} onHide={() => setDone(false)} preview />
      <LoadingSpinnerPopup showSpinner={!!loadingCreate || !!loadingUpdate} />
    </>
  );
};

export default CreationOfChecklist;
