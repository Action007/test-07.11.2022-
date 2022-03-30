import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import CreationChecklistItems from "../CreationChecklistItems/CreationChecklistItems";
import CreationChecklistPreview from "../CreationChecklistPreview/CreationChecklistPreview";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import PopupDone from "../PopupDone/PopupDone";
import "./CreationOfChecklist.scss";

import { ReactComponent as CreationImg } from "../../../assets/images/content/creationChecklist.svg";
import { ReactComponent as AddItemSvg } from "../../../assets/images/icon/addItem.svg";
import CreationTags from "../CreationTags/CreationTags";

const CreationOfChecklist = () => {
  const [preview, setPreview] = useState(false);
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

  const changeTitleHandler = (e) => {
    const { value } = e.target;
    dispatch(createChecklistActions.addTitle(value));
    dispatch(createChecklistActions.isTitleValid());
  };

  const checkValidHandler = (e, type) => {
    if (e.target) e.preventDefault();
    const tagsIsValid = tags.length > 2;
    const checklistIsEmpty = checklist_items.find(
      (item) => item.description.trim().length === 0
    );

    const isChecklistValid = checklist_items.find(
      (item) => item.description.trim().length > 150
    );
    setTagsValid(tagsIsValid);
    if (!checklist_items.length) {
      dispatch(createChecklistActions.addChecklist());
    }
    dispatch(createChecklistActions.isValid());
    dispatch(createChecklistActions.isTitleValid());

    if (
      checklist_items.length &&
      !isChecklistValid &&
      !checklistIsEmpty &&
      titleIsValid &&
      tagsIsValid
    ) {
      if (type === "preview") {
        setPreview(true);
      } else if (type === "submit") {
        dispatch(createChecklistActions.onSubmitClear());
        setDone(true);
      }
    }
  };

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
                  onClick={() => checkValidHandler(false, "preview")}
                  className="creation__button"
                  type="button"
                >
                  {translate("creationOfChecklist.preview")}
                </button>
                <button
                  onClick={(e) => checkValidHandler(e, "submit")}
                  className="creation__button"
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
      <PopupDone show={done} onHide={() => setDone(false)} preview />
    </>
  );
};

export default CreationOfChecklist;
