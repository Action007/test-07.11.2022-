import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import { checklistAPI } from "../../../services/checklistService";
import TagListSearch from "../TagListSearch/TagListSearch";
import useClickOutside from "../../../hooks/useClickOutside";
import uniqueID from "../../../utils/uniqueID";
import "./CreationTags.scss";

import { ReactComponent as PlusSvg } from "../../../assets/images/icon/plusTags.svg";
import { ReactComponent as CloseSvg } from "../../../assets/images/icon/closeTag.svg";

const CreationTags = ({ tagsValid, setTagsValid }) => {
  const [searchTagUrl, setSearchTagUrl] = useState("");
  const [url, setUrl] = useState("");
  const { data: serverTags } = checklistAPI.useFetchSearchTagsQuery(
    searchTagUrl,
    {
      skip: !searchTagUrl,
    }
  );
  const [addTags, setAddTags] = useState(false);
  const myTags = useSelector((state) => state.createChecklistReducer.tags);
  const inputTag = useRef();
  const { ref, show, setShow } = useClickOutside();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const setTime = setTimeout(() => setSearchTagUrl(url), 400);
    return () => clearTimeout(setTime);
  }, [url]);

  useEffect(() => {
    if (!inputTag.current) return;
    inputTag.current.focus();
  }, [addTags]);

  const onChangeSearchValue = (value) => {
    if (value.trim() === "") {
      setUrl("");
      setShow(false);
    } else if (serverTags) {
      if (!serverTags.length) {
        setShow(true);
        setUrl(value);
      } else {
        setShow(true);
        setUrl(value);
      }
    } else {
      setUrl(value);
      setShow(true);
    }
  };

  const setAddTagsHandler = () => {
    setAddTags((prevState) => !prevState);
    setUrl("");
  };

  const addTagHandler = (tag) => {
    const addOrNot = myTags.find((item) => item.name === tag.name);
    if (addOrNot || myTags.length === 5) return;
    if (!tag || !tag.name.trim()) return;

    setAddTagsHandler();
    setShow(false);
  };

  const removeTagHandler = (tag) => {
    const tagsIsValid = myTags.length > 3;
    dispatch(createChecklistActions.removeTag(tag.id));
    setTagsValid(tagsIsValid);
  };

  const findTypeHandler = (e, tag) => {
    if (e.key === "Enter" || e === "click") {
      addTagHandler(tag);
    }
  };

  const filterTagsList = () => {
    return serverTags.filter(
      (item) => !myTags.find((tag) => tag.id === item.id)
    );
  };

  return (
    <div className={`creation-tag${!tagsValid ? " invalid" : ""}`}>
      {myTags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => removeTagHandler(tag)}
          className="creation-tag__create creation-tag__create--tag"
          type="button"
        >
          {tag.name}
          <PlusSvg />
        </button>
      ))}
      {myTags.length < 5 &&
        (addTags ? (
          <div className="creation-tag__search">
            <label
              className="creation-tag__create creation-tag__create--width"
              htmlFor="creation-tagAdd"
              ref={ref}
            >
              <input
                onChange={() => onChangeSearchValue(inputTag.current.value)}
                onKeyPress={(e) =>
                  findTypeHandler(e, {
                    name: inputTag.current.value,
                    id: uniqueID(),
                    tags_new: true,
                  })
                }
                onFocus={() => setShow(true)}
                className="creation-tag__create creation-tag__create--input"
                ref={inputTag}
                id="creation-tagAdd"
                type="text"
                autoComplete="off"
              />
              <button
                onClick={() => setAddTagsHandler()}
                className="creation-tag__close"
                type="button"
              >
                <CloseSvg />
              </button>
              {serverTags && filterTagsList().length !== 0 && show && (
                <TagListSearch
                  tags={filterTagsList()}
                  findTypeHandler={findTypeHandler}
                />
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
