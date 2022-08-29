import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { removeSearchParamsValue } from "../../../utils/searchParamsValue";
import { useFetchSearchTagsQuery } from "../../../services/checklistTagsService";
import useClickOutside from "../../../hooks/useClickOutside";
import TagListSearch from "../TagListSearch/TagListSearch";
import uniqueID from "../../../utils/uniqueID";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./SearchInput.scss";

import { ReactComponent as CloseSvg } from "../../../assets/images/icon/closeTag.svg";
import { ReactComponent as SearchSvg } from "../../../assets/images/icon/searchInput.svg";

const SearchInput = ({ page = false, header }) => {
  const [searchTagUrl, setSearchTagUrl] = useState("");
  const [tagUrl, setTagUrl] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [myTags, setMyTag] = useState([]);
  const [blur, setBlur] = useState(false);
  const focusRef = useRef(null);
  const showOnMobile = useMediaQuery("(max-width:1200px)");

  const { data: searchTags } = useFetchSearchTagsQuery(searchTagUrl, {
    skip: !searchTagUrl,
  });

  const { pathname, search } = useLocation();
  const { t: translate } = useTranslation();
  const { ref, show, setShow } = useClickOutside();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const labelID = uniqueID();

  useEffect(() => {
    const setTime = setTimeout(() => setSearchTagUrl(tagUrl), 400);
    return () => clearTimeout(setTime);
  }, [tagUrl]);

  useEffect(() => {
    const tagNames = searchParams.getAll("search_tag_names[]");
    if (tagNames.length) {
      setMyTag(
        tagNames.map((tag) => ({
          name: tag,
          id: uniqueID(),
        }))
      );
    } else {
      setMyTag([]);
    }

    if (page === "home") {
      const searchValueUrl = searchParams.get("search_value");
      if (searchValueUrl) {
        setSearchValue(searchValueUrl);
      } else {
        setSearchValue("");
      }
    }
  }, [search]);

  useEffect(() => {
    if (page === "home" && searchValue) focusRef.current.focus();
  }, [searchValue]);

  const onChangeSearchValue = (value) => {
    const searchValueUrl = searchParams.get("search_value");
    setSearchValue(value);
    if (!value && searchValueUrl) {
      searchParams.delete("search_value");
      setSearchParams(searchParams);
    }
    const isTag = value.match(/#([a-zA-Z0-9]+)$/g);
    const tagVal = isTag ? isTag.pop().substring(1) : isTag;

    if (!isTag) {
      setTagUrl("");
      setShow(false);
    } else if (searchTags) {
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
  };

  const addTagAndSearchValue = (tag) => {
    setShow(false);
    if (showOnMobile) focusRef.current.blur();

    let tagsArray = searchValue.match(/(?:^|[ ])#([a-zA-Z0-9]+)/g);
    if (tag) tagsArray = [...tagsArray.slice(0, -1), tag.name];
    const tagsNames = tagsArray
      ? tagsArray.reduce(
          (prevTagNames, tagName) =>
            `${prevTagNames}&search_tag_names[]=${tagName.replace(/ ?#/g, "")}`,
          ""
        )
      : "";
    const searchVal = searchValue.replace(/(?:^|[ ])#([a-zA-Z0-9]+)/g, "");

    if (pathname === "/") {
      searchParams.delete("per_page");
      searchParams.delete("page");
      searchParams.append("per_page", 5);
      searchParams.append("page", 1);

      if (tagsNames) {
        tagsArray.forEach((value) => {
          searchParams.append("search_tag_names[]", value.replace(/ ?#/g, ""));
        });
      }
      if (searchVal) {
        if (!search) {
          searchParams.append("search_value", searchVal);
          setSearchParams(`?page=1&per_page=5&${searchParams}`);
        } else {
          searchParams.delete("search_value");
          searchParams.append("search_value", searchVal);
          setSearchParams(searchParams);
        }
      } else {
        searchParams.delete("search_value");
        setSearchParams(searchParams);
      }
    } else {
      navigate(`/?per_page=5&page=1&search_value=${searchVal}${tagsNames}`);
    }
    if (header) {
      setSearchValue("");
    }
  };

  const addTagFromDropdownHandler = (tag) => {
    addTagAndSearchValue(tag);
    setSearchValue("");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!searchValue) return;
    addTagAndSearchValue();
  };

  const removeTagHandler = (tag) => {
    setSearchParams(
      removeSearchParamsValue(searchParams, "search_tag_names[]", tag.name)
    );
  };

  const filterTagsList = () => {
    return searchTags.filter(
      (item) => !myTags.find((tag) => tag.name === item.name)
    );
  };

  return (
    <form onSubmit={onSubmitHandler} className="search-input" ref={ref}>
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
          addTagHandler={addTagFromDropdownHandler}
        />
      )}
      {page === "home" && (
        <div className="search-input__tags">
          {myTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => removeTagHandler(tag)}
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
