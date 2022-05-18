import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { checklistAPI } from "../../../services/checklistService";
import {
  changeSearchParamsValue,
  removeSearchParamsValue,
} from "../../../utils/searchParamsValue";
import useClickOutside from "../../../hooks/useClickOutside";
import TagListSearch from "../TagListSearch/TagListSearch";
import "./SearchInput.scss";

import { ReactComponent as CloseSvg } from "../../../assets/images/icon/closeTag.svg";

const SearchInput = ({ page = false }) => {
  const [tagUrl, setTagUrl] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [myTagsUrl, setMyTagsUrl] = useState("");

  const { data: searchTags } = checklistAPI.useFetchSearchTagsQuery(tagUrl, {
    skip: !tagUrl,
  });
  const { data: serverTags } = checklistAPI.useFetchTagsQuery(myTagsUrl, {
    skip: !myTagsUrl,
  });
  const [myTags, setMyTags] = useState(serverTags);
  const [blur, setBlur] = useState(false);
  const { ref, show, setShow } = useClickOutside();
  const [searchParams, setSearchParams] = useSearchParams();
  // const {search} = useLocation();

  useEffect(() => {
    if (!serverTags) return;
    setMyTags(serverTags);
  }, [serverTags]);

  useEffect(() => {
    const tagsIds = searchParams.getAll("search_tag_ids[]");
    if (tagsIds.length) {
      let tagsUrl = "";
      tagsIds.forEach((id) => {
        tagsUrl += `tag_ids[]=${id}&`;
      });
      setMyTagsUrl(tagsUrl.slice(0, -1));
    } else {
      setMyTags([]);
    }
  }, [searchParams]);

  useEffect(() => {
    const isTag = searchValue.trim().match(/^#/g);
    if (searchValue.trim() === "" || !isTag) {
      setTagUrl("");
      setShow(false);
    } else {
      const tagVal = searchValue.replace(/^#/g, "");
      setTagUrl(tagVal);
      setShow(true);
    }
  }, [searchValue]);

  const addTagHandler = (tag) => {
    const addOrNot = myTags.find((item) => item.name === tag.name);
    if (addOrNot || myTags.length === 5) return;
    if (!tag || !tag.name.trim()) return;

    setTagUrl("");
    setShow(false);
    setSearchValue("");
    searchParams.append("search_tag_ids[]", tag.id);
    setSearchParams(searchParams);
  };

  const findTypeHandler = (e, tag) => {
    if (e.key === "Enter" || e === "click") {
      addTagHandler(tag);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const isTag = searchValue.trim().match(/^#/g);
    if (isTag) return;

    if (searchValue) {
      setSearchParams(
        changeSearchParamsValue(searchParams, "search_value", searchValue)
      );
    }
  };

  const removeTagHandler = (id) => {
    setSearchParams(
      removeSearchParamsValue(searchParams, "search_tag_ids[]", id)
    );
  };

  const filterTagsList = () => {
    return searchTags.filter(
      (item) => !myTags.find((tag) => tag.id === item.id)
    );
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
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setBlur((prevState) => !prevState)}
          onBlur={() => setBlur((prevState) => !prevState)}
          value={searchValue}
          className="search-input__input border-0"
          placeholder="Enter a word or #tag"
          type="text"
        />
      </label>
      {searchTags && filterTagsList().length !== 0 && show && (
        <TagListSearch
          tags={filterTagsList()}
          findTypeHandler={findTypeHandler}
        />
      )}
      {page === "home" && (
        <div className="search-input__tags">
          {myTags &&
            myTags.map((tag) => (
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
