import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import {
  useCreateChecklistMutation,
  useUpdateChecklistMutation,
} from "../../../services/checklistService";
import CreationChecklistItems from "../CreationChecklistItems/CreationChecklistItems";
import CreationChecklistPreview from "../CreationChecklistPreview/CreationChecklistPreview";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import CreationTags from "../CreationTags/CreationTags";
import PopupDone from "../PopupDone/PopupDone";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import CreationCategory from "../CreationCategory/CreationCategory";
import validateLink from "../../../utils/validateLink";
import isServerError from "../../../utils/isServerError";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import "./CreationOfChecklist.scss";

import { ReactComponent as CreationImg } from "../../../assets/images/content/creationChecklist.svg";
import { ReactComponent as AddItemSvg } from "../../../assets/images/icon/addItem.svg";
import Notification from "../../UI/Notification/Notification";

const CreationOfChecklist = ({ page, id, checklists = true }) => {
  const [createOrUpdateChecklist, { isSuccess, error, isLoading, data }] =
    page === "edit-checklist"
      ? useUpdateChecklistMutation()
      : useCreateChecklistMutation();

  const [preview, setPreview] = useState(false);
  const [validButton, setValidButton] = useState();
  const [done, setDone] = useState(false);
  const [tagsValid, setTagsValid] = useState(true);
  const [tagIncludesLink, setTagIncludesLink] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

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
  const isNotContainLinks = useSelector(
    (state) => state.createChecklistReducer.title.isNotContainLinks
  );

  const tags = useSelector((state) => state.createChecklistReducer.tags);
  const categoryID = useSelector(
    (state) => state.createChecklistReducer.category.id
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
    if (isSuccess) {
      setDone(true);
      if (page !== "edit-checklist") {
        dispatch(createChecklistActions.onSubmitClear());
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isServerError(error?.status)) navigate("/error", { replace: true });
    if (!error?.data?.message) return;

    const { message } = error.data;
    let notification;

    if (
      message[0].attribute === "checklist" &&
      message[0].type === "edit_time_expired"
    ) {
      setShowNotification(true);
      notification = setTimeout(() => setShowNotification(false), 7000);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (notification) clearTimeout(notification);
    };
  }, [error]);

  const checkInputsHandler = () => {
    const tagsIsValid = tags.length > 2;
    const tagNameIncludesLink = tags.find((tag) => tag.name.includes("://"));
    const isDescriptionInvalid = checklist_items.find(
      (item) =>
        item.description.trim().length < 2 ||
        item.description.trim().length > 150
    );
    const itemsNotContainLinks = checklist_items.find((item) =>
      item.description.includes("://")
    );
    const isLinksInValid = checklist_items.find((item) =>
      item.list_type === "link" ? !validateLink(item.value?.link) : false
    );
    const isEmptyImage = checklist_items.find((item) =>
      item.list_type === "image" ? !item.value.image : false
    );
    const isEmptyCoordinate = checklist_items.find((item) =>
      item.list_type === "coordinates" ? !item.value.coordinates : false
    );
    const isInvalidTitle =
      title.trim().length < 10 || title.trim().length > 150;
    const titleNotContainLinks = !title.includes("://");
    const categoryIsValid = categoryID !== "";

    const validOrNot =
      !!checklist_items.length &&
      !isDescriptionInvalid &&
      !itemsNotContainLinks &&
      !isInvalidTitle &&
      !!titleNotContainLinks &&
      !!tagsIsValid &&
      !tagNameIncludesLink &&
      !isLinksInValid &&
      !isEmptyImage &&
      !isEmptyCoordinate &&
      categoryIsValid;

    return {
      validOrNot: !!validOrNot,
      tagsIsValid,
      tagNameIncludesLink,
      categoryIsValid,
    };
  };

  useEffect(() => {
    const { validOrNot } = checkInputsHandler();
    setValidButton(validOrNot);
  }, [tags, title, checklist_items, categoryID]);

  const isValidHandler = () => {
    const { validOrNot, tagsIsValid, tagNameIncludesLink, categoryIsValid } =
      checkInputsHandler();

    setTagsValid(tagsIsValid);
    setTagIncludesLink(tagNameIncludesLink);
    if (!checklist_items.length) {
      dispatch(createChecklistActions.addChecklist());
    }
    dispatch(createChecklistActions.isValidDescription());
    dispatch(createChecklistActions.isValidDescriptionForLinks());
    dispatch(createChecklistActions.isTitleValid());
    dispatch(createChecklistActions.isTitleNotContainLinks());
    dispatch(createChecklistActions.setValidateAfterSubmit());
    if (!categoryIsValid)
      dispatch(createChecklistActions.addCategory({ id: false, value: false }));

    return validOrNot;
  };

  const changeTitleHandler = (e) => {
    const { value } = e.target;
    dispatch(createChecklistActions.addTitle(value));
    dispatch(createChecklistActions.isTitleValid());
    dispatch(createChecklistActions.isTitleNotContainLinks());
  };

  const onClickPreviewHandler = () => {
    if (!isValidHandler()) return;
    setPreview(true);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!isValidHandler()) return;

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
          category_ids: [categoryID],
          id,
        };
      } else if (tags_new.length) {
        checklistBody = {
          name: title,
          tags_new,
          checklist_items_attributes,
          category_ids: [categoryID],
          id,
        };
      } else if (tag_ids.length) {
        checklistBody = {
          name: title,
          tag_ids,
          checklist_items_attributes,
          category_ids: [categoryID],
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
          category_ids: [categoryID],
        };
      } else if (tags_new.length) {
        checklistBody = {
          name: title,
          tags_new,
          checklist_items_attributes,
          category_ids: [categoryID],
        };
      } else if (tag_ids.length) {
        checklistBody = {
          name: title,
          tag_ids,
          checklist_items_attributes,
          category_ids: [categoryID],
        };
      }
    }

    createOrUpdateChecklist(checklistBody);
  };

  const showNewChecklist = () => {
    if (page === "edit-checklist") {
      navigate(`/checklist/${data.id}/${data.slug}`);
    } else {
      navigate(`/checklist/${data.id}/${data.slug}`);
    }
  };

  return (
    <>
      {showNotification && (
        <Notification
          translate={translate("creationOfChecklist.2hours")}
          isError
        />
      )}
      <CreationChecklistPreview
        onHide={() => setPreview(false)}
        show={preview}
      />
      <PopupDone
        show={done}
        onHide={() => setDone(false)}
        onLookChecklist={showNewChecklist}
        page="creation-of-checklist"
      />
      <LoadingSpinnerPopup showSpinner={isLoading} />
      <div
        className={`container creation pb-8${
          showNotification ? " show-notification" : ""
        }`}
      >
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
                className={`creation__span${
                  !titleIsValid || !isNotContainLinks ? " invalid" : ""
                }`}
              >
                {!titleIsValid && translate("creationOfChecklist.max")}
                {!isNotContainLinks &&
                  translate("creationOfChecklist.isNotContainLinks")}
              </span>
              <form
                className="creation__form"
                onSubmit={(e) => e.preventDefault()}
              >
                <label
                  className={`creation__name${
                    !titleIsValid || !isNotContainLinks ? " invalid" : ""
                  }`}
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
                    tagIncludesLink || (!tagsValid && validateAfterSubmit)
                      ? " invalid"
                      : ""
                  }`}
                >
                  {translate("creationOfChecklist.desc")}
                  {tagIncludesLink &&
                    translate("creationOfChecklist.tagIncludesLink")}
                </span>
                <CreationTags
                  checkInputsHandler={checkInputsHandler}
                  tagsValid={tagsValid}
                  setTagsValid={setTagsValid}
                  tagIncludesLink={tagIncludesLink}
                  setTagIncludesLink={setTagIncludesLink}
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
    </>
  );
};

export default CreationOfChecklist;
