import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import CreationChecklistItems from "../CreationChecklistItems/CreationChecklistItems";
import CreationChecklistPreview from "../CreationChecklistPreview/CreationChecklistPreview";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import PopupDone from "../PopupDone/PopupDone";
import "./CreationOfChecklist.scss";

import { ReactComponent as CreationImg } from "../../../assets/images/content/creationChecklist.svg";
import { ReactComponent as AddItemSvg } from "../../../assets/images/icon/addItem.svg";
import { ReactComponent as PlusSvg } from "../../../assets/images/icon/plusTags.svg";
import { createChecklistActions } from "../../../store/createChecklistSlice";

const CreationOfChecklist = () => {
  const [preview, setPreview] = useState(false);
  const [done, setDone] = useState(false);
  const [addTags, setAddTags] = useState(false);
  const [titleValid, setTitleValid] = useState(true);
  const [tagsValid, setTagsValid] = useState(true);
  const checklist_items = useSelector(
    (state) => state.createChecklist.checklist_items
  );
  const tags = useSelector((state) => state.createChecklist.tags);
  const title = useSelector((state) => state.createChecklist.title);
  const inputTag = useRef();
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();

  const breadcrumbs = [{ title: translate("creationOfChecklist.title") }];

  useEffect(() => {
    if (!inputTag.current) return;
    inputTag.current.focus();
  }, [addTags]);

  const setAddTagsHandler = () => {
    setAddTags((prevState) => !prevState);
  };

  const addTagHandler = (e) => {
    const name = inputTag.current.value;
    const addOrNot = tags.find((tag) => tag.name === name);
    if (e === "blur") {
      setAddTags(false);
      if (addOrNot) return;

      if (!name) return;
      dispatch(createChecklistActions.addTag(name));
    } else if (e.key === "Enter") {
      setAddTags(false);
      if (addOrNot) return;

      if (!name) return;
      dispatch(createChecklistActions.addTag(name));
    }
  };

  const changeTitleHandler = (e) => {
    const { value } = e.target;
    dispatch(createChecklistActions.addTitle(value));
  };

  const checkValidHandler = (e, type) => {
    if (e.target) e.preventDefault();
    const titleIsValid = title.trim().length < 151 && title.trim().length > 0;
    const tagsIsValid = tags.length > 2;
    const checklistIsEmpty = checklist_items.find(
      (item) => item.description.trim().length === 0
    );
    const checklistIsValid = checklist_items.find(
      (item) => item.description.trim().length > 150
    );
    setTitleValid(titleIsValid);
    setTagsValid(tagsIsValid);
    if (!checklist_items.length) {
      dispatch(createChecklistActions.addChecklist());
    }
    dispatch(createChecklistActions.isValid());

    if (
      checklist_items.length &&
      !checklistIsValid &&
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

  const addTagsOrCancel =
    tags.length < 5 &&
    (addTags ? (
      <label className="creation__create" htmlFor="creationAdd">
        <input
          onKeyPress={(e) => addTagHandler(e)}
          onBlur={() => addTagHandler("blur")}
          className="creation__create input"
          ref={inputTag}
          id="creationAdd"
          type="text"
        />
        <button
          onClick={setAddTagsHandler}
          className="creation__cancel"
          type="button"
        >
          <PlusSvg />
        </button>
      </label>
    ) : (
      <button
        onClick={setAddTagsHandler}
        className="creation__create"
        type="button"
      >
        {translate("creationOfChecklist.addTags")}
        <PlusSvg />
      </button>
    ));

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
            <span className={`creation__span${!titleValid ? " invalid" : ""}`}>
              {translate("creationOfChecklist.max")}
            </span>
            <form className="creation__form">
              <label
                className={`creation__name${!titleValid ? " invalid" : ""}`}
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
              <div className={`creation__field${!tagsValid ? " invalid" : ""}`}>
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() =>
                      dispatch(createChecklistActions.removeTag(tag.id))
                    }
                    className="creation__create tag"
                    type="button"
                  >
                    {tag.name}
                    <PlusSvg />
                  </button>
                ))}
                {addTagsOrCancel}
              </div>
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
