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
  const validateAfterSubmit = useSelector(
    (state) => state.createChecklistReducer.validateAfterSubmit
  );
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
  }, [addTags, show]);

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

  const setAddTagsHandler = (close) => {
    setAddTags(close);
    setUrl("");
  };

  const addTagHandler = (tag) => {
    if (!tag) return;
    if (tag.name.length === 0) {
      setAddTagsHandler(false);
      return;
    }
    let validTag = tag;
    const tagsIsValid = myTags.length > 1;
    const addOrNot = myTags.find(
      (item) => item.name === tag.name || item.id === tag.id
    );
    if (addOrNot || myTags.length === 5) {
      setAddTagsHandler(false);
      return;
    }
    if (!tag || !tag.name.trim()) return;
    if (tag.name.length < 31) {
      validTag = {
        name: tag.name,
        id: tag.id,
        tags_new: tag.tags_new,
      };
    }

    setAddTagsHandler(true);
    setShow(true);
    dispatch(createChecklistActions.addTag(validTag));

    if (tagsIsValid) {
      setTagsValid(true);
    }
  };

  useEffect(() => {
    if (show) return;
    addTagHandler({
      name: url,
      id: uniqueID(),
      tags_new: true,
    });
  }, [show]);

  const removeTagHandler = (tag) => {
    const tagsIsValid = myTags.length > 3;
    dispatch(createChecklistActions.removeTag(tag.id));
    setTagsValid(tagsIsValid);
    setAddTagsHandler(false);
  };

  const findTypeHandler = (e, tag) => {
    if (e.key === "Enter" || e === "click") {
      addTagHandler(tag);
    }
  };

  const filterTagsList = () => {
    return serverTags.filter(
      (item) =>
        !myTags.find((tag) => tag.name === item.name || tag.id === item.id)
    );
  };

  return (
    <div
      className={`creation-tag${
        !tagsValid && validateAfterSubmit ? " invalid" : ""
      }`}
    >
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
                value={url}
                id="creation-tagAdd"
                maxLength="30"
                type="text"
                autoComplete="off"
              />
              <button
                onClick={() => setAddTagsHandler(false)}
                className="creation-tag__close"
                type="button"
              >
                <CloseSvg />
              </button>
              {serverTags && filterTagsList().length !== 0 && show && (
                <TagListSearch
                  tags={filterTagsList()}
                  findTypeHandler={findTypeHandler}
                  page="creation-of-checklist"
                />
              )}
            </label>
          </div>
        ) : (
          <button
            onClick={() => {
              setAddTagsHandler(true);
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
