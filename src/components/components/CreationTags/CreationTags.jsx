import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import { useFetchSearchTagsQuery } from "../../../services/checklistTagsService";
import TagListSearch from "../TagListSearch/TagListSearch";
import useClickOutside from "../../../hooks/useClickOutside";
import uniqueID from "../../../utils/uniqueID";
import "./CreationTags.scss";

import { ReactComponent as PlusSvg } from "../../../assets/images/icon/plusTags.svg";
import { ReactComponent as CloseSvg } from "../../../assets/images/icon/closeTag.svg";

const CreationTags = ({
  tagsValid,
  setTagsValid,
  tagIncludesLink,
  setTagIncludesLink,
}) => {
  const [searchTagUrl, setSearchTagUrl] = useState("");
  const [url, setUrl] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [addTags, setAddTags] = useState(false);
  const inputTag = useRef();
  const { ref, show, setShow } = useClickOutside();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();

  const validateAfterSubmit = useSelector(
    (state) => state.createChecklistReducer.validateAfterSubmit
  );
  const myTags = useSelector((state) => state.createChecklistReducer.tags);

  const { data: serverTags } = useFetchSearchTagsQuery(searchTagUrl, {
    skip: !searchTagUrl,
  });

  useEffect(() => {
    const setTime = setTimeout(() => setSearchTagUrl(url), 400);
    return () => clearTimeout(setTime);
  }, [url]);

  useEffect(() => {
    if (!inputTag.current) return;

    inputTag.current.focus();
  }, [addTags, show]);

  useEffect(() => {
    const tagsIsValid = myTags.length > 2;
    const tagNameIncludesLink = myTags.find((item) =>
      item.name.includes("://")
    );
    if (tagsIsValid) {
      setTagsValid(true);
    }
    if (!tagNameIncludesLink) {
      setTagIncludesLink(false);
    }
  }, [myTags]);

  const onChangeSearchValue = (e) => {
    const tagVal = e.target.value.replace(/[^a-zA-Z0-9\s_]+/g, "");
    setTagValue(tagVal);

    if (tagVal.trim() === "") {
      setUrl("");
    } else if (serverTags) {
      if (!serverTags.length) {
        if (
          tagVal === searchTagUrl.slice(0, -1) ||
          tagVal.trim().length === 1
        ) {
          setShow(true);
          setUrl(tagVal);
        }
      } else {
        setShow(true);
        setUrl(tagVal);
      }
    } else {
      setUrl(tagVal);
      setShow(true);
    }
  };

  const setAddTagsHandler = (close) => {
    setAddTags(close);
    setUrl("");
    setTagValue("");
  };

  const addTagHandler = (tag) => {
    if (!tag) return;
    if (tag.name.length === 0) {
      setAddTagsHandler(false);
      return;
    }
    let validTag = tag;
    const tagNameIncludesLink = tag.name.includes("://");
    const addOrNot = myTags.find((item) => item.name === tag.name);
    if (addOrNot) return;
    if (myTags.length === 5) {
      setAddTagsHandler(false);
      return;
    }
    if (tag.name.trim().length < 2) return;
    if (tag.name.length < 31) {
      validTag = {
        name: tag.name.trim().replace(/\s+/g, "_"),
        id: tag.id,
        tags_new: tag.tags_new,
      };
      setTagValue("");
    }

    setAddTagsHandler(true);
    setShow(true);
    dispatch(createChecklistActions.addTag(validTag));

    if (tagNameIncludesLink) {
      setTagIncludesLink(true);
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

  const addTagOnEnterHandler = (e) => {
    if (e.key !== "Enter" || !inputTag.current.value) return;
    addTagHandler({
      name: inputTag.current.value,
      id: uniqueID(),
      tags_new: true,
    });
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
        tagIncludesLink || (!tagsValid && validateAfterSubmit) ? " invalid" : ""
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
                onChange={onChangeSearchValue}
                onKeyPress={addTagOnEnterHandler}
                onFocus={() => setShow(true)}
                value={tagValue}
                className="creation-tag__create creation-tag__create--input"
                ref={inputTag}
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
                  addTagHandler={addTagHandler}
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
