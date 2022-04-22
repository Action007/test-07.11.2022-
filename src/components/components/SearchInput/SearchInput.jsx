import React, { useEffect, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { checklistAPI } from "../../../services/checklistService";
import uniqueID from "../../../utils/uniqueID";
import TagListSearch from "../TagListSearch/TagListSearch";
import "./SearchInput.scss";

import { ReactComponent as CloseSvg } from "../../../assets/images/icon/closeTag.svg";

const SearchInput = ({ page = false, searchHandler }) => {
  const [blur, setBlur] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [myTags, setMyTags] = useState([]);
  const [url, setUrl] = useState(null);
  const { data: serverTags } = checklistAPI.useFetchChecklistQuery(
    `/api/v1/tags/search?value=${url}`
  );
  const { ref, show, setShow } = useClickOutside();
  const [tags, setTags] = useState(serverTags);

  useEffect(() => {
    if (!serverTags) return;

    setTags(
      serverTags.filter((item) => !myTags.find((tag) => tag.id === item.id))
    );
  }, [serverTags]);

  const addTagHandler = (tag) => {
    const addOrNot = myTags.find((item) => item.name === tag.name);

    if (addOrNot) return;
    if (!tag || !tag.name.trim()) return;

    setMyTags([...myTags, tag]);
    setUrl(uniqueID());
    setShow(false);
    setSearchValue("");
  };

  const searchTagsHandler = (value) => {
    if (value.trim() === "") {
      setUrl(uniqueID());
    } else {
      setUrl(value);
    }
  };

  const findTypeHandler = (e, tag) => {
    if (e.key === "Enter" || e === "click") {
      addTagHandler(tag);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const value = searchValue.trim();
    searchHandler(value);
  };

  const removeTagHandler = (id) => {
    setMyTags(myTags.filter((tag) => tag.id !== id));
  };

  return (
    <form
      onSubmit={(e) => onSubmitHandler(e)}
      className="search-input"
      ref={ref}
    >
      <label
        className={`${`search-input__label`}${blur ? " active" : ""}`}
        htmlFor="search-input"
      >
        <input
          onChange={(e) => {
            setSearchValue(e.target.value);
            searchTagsHandler(e.target.value);
          }}
          onFocus={() => {
            setShow(true);
            setBlur((prevState) => !prevState);
          }}
          onBlur={() => setBlur((prevState) => !prevState)}
          value={searchValue}
          className="search-input__input border-0"
          placeholder="Enter a word or #tag"
          type="text"
        />
      </label>
      {serverTags && serverTags.length !== 0 && show && (
        <TagListSearch tags={tags} findTypeHandler={findTypeHandler} />
      )}
      {page === "home" && (
        <div className="search-input__tags">
          {myTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => removeTagHandler(tag.id)}
              className="search-input__tag"
              type="button"
            >
              #{tag.name}
              <CloseSvg />
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchInput;
