import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CreationChecklistItems from "../CreationChecklistItems/CreationChecklistItems";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./CreationOfChecklist.scss";

import { ReactComponent as CreationImg } from "../../../assets/images/content/creationChecklist.svg";
import { ReactComponent as AddItemSvg } from "../../../assets/images/icon/addItem.svg";
import { ReactComponent as PlusSvg } from "../../../assets/images/icon/plusTags.svg";
import { createChecklistActions } from "../../../store/createChecklistSlice";

const CreationOfChecklist = () => {
  const dispatch = useDispatch();
  const checklists = useSelector((state) => state.createChecklist.checklists);
  const tags = useSelector((state) => state.createChecklist.tags);
  const [addTags, setAddTags] = useState(false);
  const inputTag = useRef();
  const { t: translate } = useTranslation();
  const breadcrumbs = [{ title: translate("creationOfChecklist.title") }];

  const setAddTagsHandler = () => {
    setAddTags((prevState) => !prevState);
  };

  const addTagHandler = (e) => {
    if (e.key !== "Enter") return;

    const name = inputTag.current.value;
    const addOrNot = tags.find((tag) => tag.name === name);

    if (addOrNot) return;

    dispatch(createChecklistActions.addTag(name));
    setAddTags(false);
  };

  useEffect(() => {
    if (!inputTag.current) return;
    inputTag.current.focus();
  }, [addTags]);

  const addTagsOrCancel =
    tags.length < 5 &&
    (addTags ? (
      <label className="creation__create" htmlFor="creationAdd">
        <input
          onKeyPress={(e) => addTagHandler(e)}
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
    <div className="creation pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="creation__title SFPro-600">
        {translate("creationOfChecklist.title")}
      </h2>
      <div className="creation__wrapper">
        <div className="creation__wrap">
          <h3 className="creation__head SFPro-700">
            {translate("creationOfChecklist.name")}
          </h3>
          <span className="creation__span">
            {translate("creationOfChecklist.max")}
          </span>
          <form className="creation__form">
            <label className="creation__name" htmlFor="creationID">
              <input type="text" id="creationID" />
            </label>
            <div className="creation__inner">
              <div className="creation__box">
                <h3 className="creation__head SFPro-700">
                  {translate("creationOfChecklist.points")}
                </h3>
                {translate("creationOfChecklist.text")}
              </div>
              <button
                onClick={() => dispatch(createChecklistActions.addChecklist())}
                className="creation__add SFPro-600"
                type="button"
              >
                <AddItemSvg />
                {translate("creationOfChecklist.addBtn")}
              </button>
            </div>
            <CreationChecklistItems checklistItems={checklists} />
            <h3 className="creation__head SFPro-700">
              {translate("creationOfChecklist.tags")}
            </h3>
            <span className="creation__desc">
              {translate("creationOfChecklist.desc")}
            </span>
            <div className="creation__field">
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
              <button className="creation__button" type="button">
                {translate("creationOfChecklist.preview")}
              </button>
              <button className="creation__button" type="button">
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
  );
};

export default CreationOfChecklist;
