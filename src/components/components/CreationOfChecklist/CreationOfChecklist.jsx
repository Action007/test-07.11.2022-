import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import { checklistAPI } from "../../../services/checklistService";
import CreationChecklistItems from "../CreationChecklistItems/CreationChecklistItems";
import CreationChecklistPreview from "../CreationChecklistPreview/CreationChecklistPreview";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import CreationTags from "../CreationTags/CreationTags";
import PopupCreateDone from "../PopupCreateDone/PopupCreateDone";
import "./CreationOfChecklist.scss";

import { ReactComponent as CreationImg } from "../../../assets/images/content/creationChecklist.svg";
import { ReactComponent as AddItemSvg } from "../../../assets/images/icon/addItem.svg";
// import { Modal } from "react-bootstrap";

const CreationOfChecklist = ({ edit = false, id }) => {
  // eslint-disable-next-line no-empty-pattern
  const [createChecklist, { isSuccess: successCreate }] =
    checklistAPI.useCreateChecklistMutation();
  // eslint-disable-next-line no-empty-pattern
  const [updateChecklist, { isSuccess: successUpdate }] =
    checklistAPI.useUpdateChecklistMutation();
  const [preview, setPreview] = useState(false);
  const [validButton, setValidButton] = useState();
  const [done, setDone] = useState(false);
  const [tagsValid, setTagsValid] = useState(true);
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
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const breadcrumbs = [{ title: translate("creationOfChecklist.title") }];

  useEffect(() => {
    const tagsIsValid = tags.length > 2;
    const checklistIsEmpty = checklist_items.find(
      (item) => item.description.trim().length === 0
    );
    const isChecklistValid = checklist_items.find(
      (item) => item.description.trim().length > 150
    );
    // eslint-disable-next-line no-shadow
    const titleIsValid = title.trim().length !== 0 && title.trim().length < 150;

    const validOrNot =
      checklist_items.length &&
      !isChecklistValid &&
      !checklistIsEmpty &&
      titleIsValid &&
      tagsIsValid;

    setValidButton(!!validOrNot);
  }, [tags, title, checklist_items]);

  useEffect(() => {
    if (successCreate || successUpdate) {
      dispatch(createChecklistActions.onSubmitClear());
      setDone(true);
    }
  }, [successCreate, successUpdate]);

  const checkValidHandler = (e) => {
    if (e.target) e.preventDefault();
    const tagsIsValid = tags.length > 2;
    const checklistIsEmpty = checklist_items.find(
      (item) => item.description.trim().length === 0
    );

    const isChecklistValid = checklist_items.find(
      (item) => item.description.trim().length > 150
    );
    // eslint-disable-next-line no-shadow
    const titleIsValid = title.trim().length !== 0 && title.trim().length < 150;
    setTagsValid(tagsIsValid);
    if (!checklist_items.length) {
      dispatch(createChecklistActions.addChecklist());
    }
    dispatch(createChecklistActions.isValid());
    dispatch(createChecklistActions.isTitleValid());

    const validOrNot =
      checklist_items.length &&
      !isChecklistValid &&
      !checklistIsEmpty &&
      titleIsValid &&
      tagsIsValid;

    return !!validOrNot;
  };

  const changeTitleHandler = (e) => {
    const { value } = e.target;
    dispatch(createChecklistActions.addTitle(value));
    dispatch(createChecklistActions.isTitleValid());
  };

  const onClickPreviewHandler = () => {
    if (!checkValidHandler(false)) return;
    setPreview(true);
  };

  const onSubmitHandler = async (e) => {
    if (!checkValidHandler(e)) return;
    let checklistBody = {};
    const tags_new = [];
    const tag_ids = [];
    const checklist_items_attributes = [];

    checklist_items.forEach(({ description, list_type, value }) => {
      if (list_type === "text") {
        checklist_items_attributes.push({
          list_type,
          description,
        });
      } else {
        checklist_items_attributes.push({
          list_type,
          description,
          value,
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
          id,
        };
      } else if (tags_new.length) {
        checklistBody = {
          name: title,
          tags_new,
          checklist_items_attributes,
          id,
        };
      } else if (tag_ids.length) {
        checklistBody = {
          name: title,
          tag_ids,
          checklist_items_attributes,
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
        };
      } else if (tags_new.length) {
        checklistBody = {
          name: title,
          tags_new,
          checklist_items_attributes,
        };
      } else if (tag_ids.length) {
        checklistBody = {
          name: title,
          tag_ids,
          checklist_items_attributes,
        };
      }
    }

    if (!edit) createChecklist(checklistBody);
    if (edit) updateChecklist(checklistBody);
  };

  // const loadingSpinner = (
  //   <Modal
  //     className="create-done"
  //     show={show}
  //     onHide={onHide}
  //     aria-labelledby="contained-modal-title-vcenter"
  //     centered
  //   >
  //     <Modal.Header closeButton>
  //       <Modal.Title id="contained-modal-title-vcenter" />
  //     </Modal.Header>
  //     <Modal.Body>
  //     </Modal.Body>
  //     <Modal />
  // );

  return (
    <>
      <div className="container creation pb-8">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h2 className="creation__title SFPro-600">
          {translate("creationOfChecklist.title")}
        </h2>
        <div className="creation__wrapper">
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
              <CreationChecklistItems checklist_items={checklist_items} />
              <h3 className="creation__head SFPro-700">
                {translate("creationOfChecklist.tags")}
              </h3>
              <span className={`creation__desc${!tagsValid ? " invalid" : ""}`}>
                {translate("creationOfChecklist.desc")}
              </span>
              <CreationTags tagsValid={tagsValid} setTagsValid={setTagsValid} />
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
          <div className="creation__img">
            <CreationImg />
          </div>
        </div>
      </div>
      <CSSTransition in={preview} timeout={300} unmountOnExit>
        <CreationChecklistPreview
          onHide={() => setPreview(false)}
          show={preview}
        />
      </CSSTransition>
      <PopupCreateDone show={done} onHide={() => setDone(false)} preview />
      {/* {loadingCreate && loadingSpinner}
      {loadingUpdate && loadingSpinner} */}
    </>
  );
};

export default CreationOfChecklist;
