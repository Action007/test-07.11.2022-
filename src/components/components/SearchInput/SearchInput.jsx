import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checklistAPI } from "../../../services/checklistService";
import { navigationChecklistActions } from "../../../store/navigationChecklistSlice";
import useClickOutside from "../../../hooks/useClickOutside";
import TagListSearch from "../TagListSearch/TagListSearch";
import "./SearchInput.scss";

import { ReactComponent as CloseSvg } from "../../../assets/images/icon/closeTag.svg";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const SearchInput = ({ page = false }) => {
  const [myTags, setMyTags] = useState([]);
  const [tagUrl, setTagUrl] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [validTagValue, setValidTagValue] = useState("");
  const [sendRequestTag, setSendRequestTag] = useState("");

  const { data: searchTags = [] } =
    checklistAPI.useFetchSearchTagsQuery(sendRequestTag);
  const [tags, setTags] = useState(searchTags);

  const pageValue = useSelector(
    (state) => state.navigationChecklistReducer.pageValue
  );
  const categoryValue = useSelector(
    (state) => state.navigationChecklistReducer.categoryValue
  );
  const tagValue = useSelector(
    (state) => state.navigationChecklistReducer.tagValue
  );
  const popularValue = useSelector(
    (state) => state.navigationChecklistReducer.popularValue
  );
  const latestValue = useSelector(
    (state) => state.navigationChecklistReducer.latestValue
  );

  const [blur, setBlur] = useState(false);
  const { ref, show, setShow } = useClickOutside();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // const { search } = useLocation();

  useEffect(() => {
    const tagsIds = searchParams.getAll("search_tag_ids[]");
    if (tagsIds.length) {
      // eslint-disable-next-line no-unused-vars
      let tagsUrl = "";
      tagsIds.forEach((id) => {
        tagsUrl += `tag_ids[]=${id}&`;
      });

      (async () => {
        const response = await fetch(
          `${API_KEY}/api/v1/tags/search?${tagsUrl.slice(0, -1)}`
        );
        const responseData = await response.json();
        setMyTags(responseData);
      })();
    } else {
      setMyTags([]);
    }
  }, [searchParams]);

  useEffect(() => {
    const tagVal = tagUrl.replace(/^#/g, "");
    if (searchTags && searchTags.length) setValidTagValue(tagVal);
    if (!searchTags) return;

    setTags(
      searchTags.filter((item) => !myTags.find((tag) => tag.id === item.id))
    );
  }, [searchTags]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSendRequestTag(tagUrl);
    }, 350);

    return () => clearTimeout(delayDebounceFn);
  }, [tagUrl]);

  useEffect(() => {
    const isTag = searchValue.trim().match(/^#/g);

    if (searchValue.trim() === "" || !isTag) {
      setTagUrl("");
      setShow(false);
    } else {
      const tagVal = searchValue.replace(/^#/g, "");
      if (searchTags.length || validTagValue === tagVal) setTagUrl(tagVal);
      setShow(true);
    }
  }, [searchValue]);

  const addTagHandler = (tag) => {
    const addOrNot = myTags.find((item) => item.name === tag.name);
    if (addOrNot || myTags.length === 5) return;
    if (!tag || !tag.name.trim()) return;

    dispatch(navigationChecklistActions.setTagsID(tag.id));
    setTagUrl("");
    setShow(false);
    setSearchValue("");
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

    dispatch(navigationChecklistActions.setSearchValue(searchValue));
    navigate(
      `/?search_value=${searchValue}${
        searchValue && (latestValue || popularValue) ? "&" : ""
      }${popularValue}${latestValue}&page=${pageValue}&per_page=3${tagValue}${categoryValue}`
    );
  };

  const removeTagHandler = () => {
    searchParams.delete("search_tag_ids[]");
    setSearchParams(searchParams);
    dispatch(navigationChecklistActions.removeTagsID());
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
      {searchTags && tags.length !== 0 && show && (
        <TagListSearch tags={tags} findTypeHandler={findTypeHandler} />
      )}
      {page === "home" && (
        <div className="search-input__tags">
          {myTags.length !== 0 &&
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
