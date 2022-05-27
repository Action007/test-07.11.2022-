import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchTagUrl, setSearchTagUrl] = useState("");
  const [tagUrl, setTagUrl] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [myTagsUrl, setMyTagsUrl] = useState("");

  const { data: searchTags } = checklistAPI.useFetchSearchTagsQuery(
    searchTagUrl,
    {
      skip: !searchTagUrl,
    }
  );
  const { data: serverTags } = checklistAPI.useFetchTagsQuery(myTagsUrl, {
    skip: !myTagsUrl,
  });

  const [myTags, setMyTags] = useState(serverTags);
  const [blur, setBlur] = useState(false);

  const { ref, show, setShow } = useClickOutside();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const setTime = setTimeout(() => setSearchTagUrl(tagUrl), 400);
    return () => clearTimeout(setTime);
  }, [tagUrl]);

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

  const onChangeSearchValue = (value) => {
    const isTag = value.trim().match(/^#/g);
    const tagVal = value.replace(/^#/g, "");
    setSearchValue(value);

    if (value.trim() === "" || !isTag) {
      setTagUrl("");
      setShow(false);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (searchTags) {
        if (!searchTags.length) {
          if (tagVal === tagUrl.slice(0, -1) || tagVal.trim().length === 1) {
            setShow(true);
            setTagUrl(tagVal);
          }
        } else {
          setShow(true);
          setTagUrl(tagVal);
        }
      } else {
        setTagUrl(tagVal);
        setShow(true);
      }
    }
  };

  const addTagHandler = (tag) => {
    const addOrNot = myTags.find((item) => item.name === tag.name);
    if (addOrNot || myTags.length === 5) return;
    if (!tag || !tag.name.trim()) return;

    setTagUrl("");
    setShow(false);
    if (pathname === "/") {
      searchParams.append("search_tag_ids[]", tag.id);
      setSearchParams(searchParams);
    } else {
      navigate(`/?page=1&per_page=3&search_tag_ids[]=${tag.id}`);
    }
  };

  const findTypeHandler = (e, tag) => {
    if (e.key === "Enter" || e === "click") {
      addTagHandler(tag);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const isTag = searchValue.trim().match(/^#/g);
    if (isTag) {
      setSearchValue("");
    } else {
      if (pathname === "/") {
        if (searchValue) {
          setSearchParams(
            changeSearchParamsValue(searchParams, "search_value", searchValue)
          );
        } else {
          searchParams.delete("search_value");
          setSearchParams(searchParams);
        }
      } else {
        navigate(`/?per_page=3&page=1&search_value=${searchValue}`);
      }
      setSearchValue("");
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
          onChange={(e) => onChangeSearchValue(e.target.value)}
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
