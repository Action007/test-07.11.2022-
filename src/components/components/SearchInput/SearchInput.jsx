import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../../../services/checklistService";
import {
  changeSearchParamsValue,
  removeSearchParamsValue,
} from "../../../utils/searchParamsValue";
import useClickOutside from "../../../hooks/useClickOutside";
import TagListSearch from "../TagListSearch/TagListSearch";
import uniqueID from "../../../utils/uniqueID";
import getTag from "../../../utils/getTag";
import "./SearchInput.scss";

import { ReactComponent as CloseSvg } from "../../../assets/images/icon/closeTag.svg";
import { ReactComponent as SearchSvg } from "../../../assets/images/icon/searchInput.svg";

const SearchInput = ({ page = false, header }) => {
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
  const [blur, setBlur] = useState(false);
  const focusRef = useRef(null);
  const { ref, show, setShow } = useClickOutside();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const labelID = uniqueID();

  useEffect(() => {
    const setTime = setTimeout(() => setSearchTagUrl(tagUrl), 400);
    return () => clearTimeout(setTime);
  }, [tagUrl]);

  useEffect(() => {
    const tagsIds = searchParams.getAll("search_tag_ids[]");
    if (tagsIds.length) {
      let tagsUrl = "";
      tagsIds.forEach((id) => {
        tagsUrl += `tag_ids[]=${id}&`;
      });
      setMyTagsUrl(tagsUrl.slice(0, -1));
    } else {
      setMyTagsUrl("");
    }

    if (page === "home") {
      const searchValueUrl = searchParams.get("search_value");
      if (searchValueUrl) {
        setSearchValue(searchValueUrl);
        focusRef.current.focus();
      } else {
        setSearchValue("");
      }
    }
  }, [search]);

  const onChangeSearchValue = (value) => {
    const searchValueUrl = searchParams.get("search_value");
    setSearchValue(value);
    if (!value && searchValueUrl) {
      searchParams.delete("search_value");
      setSearchParams(searchParams);
    }
    const isTag = value.match(/^#[\s\S]*$/g);
    const isTagWithSearchValue = value.match(/[\s]* #[\s\S]*$/g);

    if (!isTag && !isTagWithSearchValue) {
      setTagUrl("");
      setShow(false);
    } else if (searchTags) {
      const tagVal = getTag(value);
      if (!searchTags.length) {
        if (tagVal === tagUrl.slice(0, -1) || !tagVal) {
          setShow(true);
          setTagUrl(tagVal);
        }
      } else {
        setShow(true);
        setTagUrl(tagVal);
      }
    } else {
      const tagValue = isTag
        ? isTag[0].substring(1)
        : isTagWithSearchValue[0].match(/#[\s\S]*$/g)[0].substring(1);
      setTagUrl(tagValue);
      setShow(true);
    }
  };

  const addTagHandler = (tag) => {
    if (serverTags?.length === 5 && serverTags) return;
    if (!tag || !tag.name.trim()) return;
    const searchVal = searchValue
      .replace(/[\s]* #[\s\S]*$/g, "")
      .replace(/^#[\s\S]*$/g, "");

    setSearchValue(searchVal);
    setTagUrl("");
    setShow(false);
    if (pathname === "/") {
      searchParams.delete("search_value");
      if (searchVal) searchParams.append("search_value", searchVal);
      searchParams.append("search_tag_ids[]", tag.id);
      if (!search) {
        setSearchParams(`?page=1&per_page=5&${searchParams}`);
      } else {
        setSearchParams(searchParams);
      }
    } else {
      navigate(`/?page=1&per_page=5&search_tag_ids[]=${tag.id}`);
    }
  };

  const findTypeHandler = (e, tag) => {
    if (e.key === "Enter" || e === "click") {
      addTagHandler(tag);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const isTag = searchValue.match(/^#[\s\S]*$/g);
    const isTagWithSearchValue = searchValue.match(/[\s]* #[\s\S]*$/g);
    if (isTag || isTagWithSearchValue) return;

    const searchVal = searchValue.replace(/[\s]* #[\s\S]*$/g, "");
    if (pathname === "/") {
      if (searchVal) {
        if (!search) {
          setSearchParams(
            `?page=1&per_page=5&${changeSearchParamsValue(
              searchParams,
              "search_value",
              searchVal
            )}`
          );
        } else {
          setSearchParams(
            changeSearchParamsValue(searchParams, "search_value", searchVal)
          );
        }
      } else {
        searchParams.delete("search_value");
        setSearchParams(searchParams);
      }
    } else {
      navigate(`/?per_page=5&page=1&search_value=${searchVal}`);
    }
    if (header) {
      setSearchValue("");
    }
  };

  const removeTagHandler = (id) => {
    setSearchParams(
      removeSearchParamsValue(searchParams, "search_tag_ids[]", id)
    );
  };

  const filterTagsList = () => {
    return searchTags.filter((item) =>
      serverTags && (serverTags.length !== 1 || myTagsUrl)
        ? !serverTags.find(
            (tag) => tag.id === item.id && tag.name === item.name
          )
        : item
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
        htmlFor={labelID}
      >
        <SearchSvg />
        <input
          onChange={(e) => onChangeSearchValue(e.target.value)}
          onFocus={(e) => {
            onChangeSearchValue(e.target.value);
            setBlur((prevState) => !prevState);
          }}
          onBlur={() => setBlur((prevState) => !prevState)}
          value={searchValue}
          className="search-input__input border-0 SFPro-400"
          placeholder={translate("inputPlaceholder")}
          type="text"
          id={labelID}
          ref={focusRef}
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
          {serverTags &&
            myTagsUrl &&
            serverTags.map((tag) => (
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
