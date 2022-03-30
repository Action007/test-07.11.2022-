import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import { checklistAPI } from "../../../services/checklistService";
import useClickOutside from "../../../hooks/useClickOutside";
import uniqueID from "../../../utils/uniqueID";
import "./CreationTags.scss";

import { ReactComponent as PlusSvg } from "../../../assets/images/icon/plusTags.svg";
import { ReactComponent as CloseSvg } from "../../../assets/images/icon/closeBtn.svg";
import { ReactComponent as DoneSvg } from "../../../assets/images/icon/doneBtn.svg";

const CreationTags = ({ tagsValid, setTagsValid }) => {
  const [url, setUrl] = useState(null);
  const { data: tagItems } = checklistAPI.useFetchChecklistQuery(
    `/api/v1/tags/search?value=${url}`
  );
  const [addTags, setAddTags] = useState(false);
  const tags = useSelector((state) => state.createChecklistReducer.tags);
  const inputTag = useRef();
  const { ref, show, setShow } = useClickOutside();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!inputTag.current) return;
    inputTag.current.focus();
  }, [addTags]);

  const searchTagsHandler = (value) => {
    if (value.trim() === "") {
      setUrl(uniqueID());
    } else {
      const searchUrl = value.replace(" ", "%20");
      setUrl(searchUrl);
    }
  };

  const setAddTagsHandler = () => {
    setAddTags((prevState) => !prevState);
    setUrl(uniqueID());
  };

  const addTagHandler = (e, name) => {
    if (e.key === "Enter" || e === "click") {
      const tagsIsValid = tags.length > 1;
      const addOrNot = tags.find((tag) => tag.name === name);

      if (addOrNot) return;
      if (!name.trim()) return;

      setAddTags(false);
      setUrl(uniqueID());
      setShow(false);

      dispatch(createChecklistActions.addTag(name));
      if (tagsIsValid) {
        setTagsValid(true);
      }
    }
  };

  return (
    <div className={`creation-tag${!tagsValid ? " invalid" : ""}`}>
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => dispatch(createChecklistActions.removeTag(tag.id))}
          className="creation-tag__create creation-tag__create--tag"
          type="button"
        >
          {tag.name}
          <PlusSvg />
        </button>
      ))}
      {tags.length < 5 &&
        (addTags ? (
          <div className="creation-tag__search" ref={ref}>
            <label
              className="creation-tag__create creation-tag__create--width"
              htmlFor="creation-tagAdd"
            >
              <input
                onChange={() => searchTagsHandler(inputTag.current.value)}
                onKeyPress={(e) => addTagHandler(e, inputTag.current.value)}
                onFocus={() => setShow(true)}
                className="creation-tag__create creation-tag__create--input"
                ref={inputTag}
                id="creation-tagAdd"
                type="text"
                autoComplete="off"
              />
              <button
                onClick={() => addTagHandler("click", inputTag.current.value)}
                className="creation-tag__add"
                type="button"
              >
                <DoneSvg />
              </button>
              <button
                onClick={() => {
                  setAddTagsHandler();
                  setShow(false);
                }}
                className="creation-tag__cancel"
                type="button"
              >
                <CloseSvg />
              </button>
              {tagItems.length && show ? (
                <ul
                  className="creation-tag__dropdown"
                  aria-labelledby="dropdownMenuButton"
                >
                  {tagItems.map((tag) => (
                    <li key={tag.id} className="creation-tag__item">
                      <button
                        onClick={() => addTagHandler("click", tag.name)}
                        type="button"
                      >
                        {tag.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </label>
          </div>
        ) : (
          <button
            onClick={() => {
              setAddTagsHandler();
              setShow(true);
            }}
            className="creation-tag__create"
            type="button"
          >
            {translate("creationOfChecklist.addTags")}
            <PlusSvg />
          </button>
        ))}
    </div>
  );
};

export default CreationTags;
