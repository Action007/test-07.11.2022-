import React from "react";
import { useSearchParams } from "react-router-dom";
import { changeSearchParamsValue } from "../../../../utils/searchParamsValue";
import "./ChecklistTags.scss";

const ChecklistTags = ({ tags, isPreview, navigate, pathname, search }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigationHandler = (tagID) => {
    if (pathname === "/") {
      if (!search) {
        setSearchParams(
          `?per_page=5&${changeSearchParamsValue(
            searchParams,
            "search_tag_ids[]",
            tagID
          )}`
        );
      } else {
        setSearchParams(
          changeSearchParamsValue(searchParams, "search_tag_ids[]", tagID)
        );
      }
    } else {
      navigate(`/?page=1&per_page=5&search_tag_ids[]=${tagID}`);
    }
  };

  return (
    <div className={`checklist-tags${isPreview ? " preview" : ""}`}>
      {tags.map((tag) =>
        !isPreview ? (
          <button
            onClick={() => navigationHandler(tag.id)}
            className="checklist-tags__item"
            key={tag.id}
            type="button"
          >
            #{tag.name}
          </button>
        ) : (
          <div className="checklist-tags__item" key={tag.id}>
            #{tag.name}
          </div>
        )
      )}
    </div>
  );
};

export default ChecklistTags;