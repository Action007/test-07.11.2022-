import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import { checklistAPI } from "../../../services/checklistService";
import useClickOutside from "../../../hooks/useClickOutside";
import uniqueID from "../../../utils/uniqueID";
import "./CreationTags.scss";

import { ReactComponent as PlusSvg } from "../../../assets/images/icon/plusTags.svg";
import { ReactComponent as CloseSvg } from "../../../assets/images/icon/closeTag.svg";

const CreationTags = ({ tagsValid, setTagsValid }) => {
  const [url, setUrl] = useState(null);
  const { data: serverTags } = checklistAPI.useFetchChecklistQuery(
    `/api/v1/tags/search?value=${url}`
  );
  const [tags, setTags] = useState(serverTags);
  const [addTags, setAddTags] = useState(false);
  const myTags = useSelector((state) => state.createChecklistReducer.tags);
  const inputTag = useRef();
  const { ref, show, setShow } = useClickOutside();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();

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

  const addTagHandler = (tag) => {
    const tagsIsValid = myTags.length > 1;
    const addOrNot = myTags.find((item) => item.name === tag.name);

    if (addOrNot) return;
    if (!tag || !tag.name.trim()) return;

    setAddTagsHandler();
    setShow(false);

    dispatch(createChecklistActions.addTag(tag));
    if (tagsIsValid) {
      setTagsValid(true);
    }
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

  useEffect(() => {
    if (!inputTag.current) return;
    inputTag.current.focus();
  }, [addTags]);

  useEffect(() => {
    if (!inputTag.current) return;
    addTagHandler({
      name: inputTag.current.value,
      id: uniqueID(),
      tags_new: true,
    });
  }, [show]);

  useEffect(() => {
    if (!serverTags) return;

    setTags(
      serverTags.filter((item) => !myTags.find((tag) => tag.id === item.id))
    );
  }, [serverTags]);

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
                onChange={() => searchTagsHandler(inputTag.current.value)}
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
              {serverTags.length && show ? (
                <ul
                  className="creation-tag__dropdown"
                  aria-labelledby="dropdownMenuButton"
                >
                  {tags.map((tag) => (
                    <li key={tag.id} className="creation-tag__item">
                      <button
                        onClick={() =>
                          findTypeHandler("click", {
                            name: tag.name,
                            id: tag.id,
                          })
                        }
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
