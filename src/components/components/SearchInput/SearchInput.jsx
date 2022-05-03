import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { checklistAPI } from "../../../services/checklistService";
import { navigationChecklistActions } from "../../../store/navigationChecklistSlice";
import useClickOutside from "../../../hooks/useClickOutside";
import TagListSearch from "../TagListSearch/TagListSearch";
import "./SearchInput.scss";

import { ReactComponent as CloseSvg } from "../../../assets/images/icon/closeTag.svg";

const SearchInput = ({ page = false }) => {
  const [blur, setBlur] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [myTags] = useState([]);
  const [validTagValue, setValidTagValue] = useState("");
  const [tagUrl, setTagUrl] = useState("");
  const [sendRequestTag, setSendRequestTag] = useState("");
  const { data: serverTags } =
    checklistAPI.useFetchTagsChecklistQuery(sendRequestTag);
  const { ref, show, setShow } = useClickOutside();
  const [tags, setTags] = useState(serverTags);
  const pageValue = useSelector(
    (state) => state.navigationChecklistReducer.pageValue
  );
  const categoryValue = useSelector(
    (state) => state.navigationChecklistReducer.categoryValue
  );
  const tagValue = useSelector(
    (state) => state.navigationChecklistReducer.tagValue
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  const { search } = useLocation();

  useEffect(() => {
    const tagVal = tagUrl.replace(/^#/g, "");
    if (serverTags && serverTags.length) setValidTagValue(tagVal);
    if (!serverTags) return;

    setTags(
      serverTags.filter((item) => !myTags.find((tag) => tag.id === item.id))
    );
  }, [serverTags]);

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
      if (serverTags.length || validTagValue === tagVal) setTagUrl(tagVal);
      setShow(true);
    }
  }, [searchValue]);

  const addTagHandler = (tag) => {
    const addOrNot = myTags.find((item) => item.name === tag.name);

    if (addOrNot) return;
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
      `/?search_value=${searchValue}&page=${pageValue}&per_page=3${tagValue}${categoryValue}`
    );
  };

  const removeTagHandler = (id) => {
    const address = search.replace(`&search_tag_ids[]=${id}`, "");
    navigate(address);
    dispatch(navigationChecklistActions.removeTagID(id));
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
