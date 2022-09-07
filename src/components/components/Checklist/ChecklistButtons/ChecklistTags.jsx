import React from "react";
import { useSearchParams } from "react-router-dom";
import { changeSearchParamsValue } from "../../../../utils/searchParamsValue";
import "./ChecklistTags.scss";

const ChecklistTags = ({ tags, isPreview, navigate, pathname, search }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigationHandler = (tagName) => {
    if (pathname === "/") {
      if (!search) {
        setSearchParams(
          `?per_page=5&${changeSearchParamsValue(
            searchParams,
            "search_tag_names[]",
            tagName
          )}`
        );
      } else {
        setSearchParams(
          changeSearchParamsValue(searchParams, "search_tag_names[]", tagName)
        );
      }
    } else {
      navigate(`/?page=1&per_page=5&search_tag_names[]=${tagName}`);
    }
  };

  return (
    <div
      className={`checklist-tags${isPreview ? " checklist-tags--preview" : ""}`}
    >
      {tags.map((tag) =>
        !isPreview ? (
          <button
            onClick={() => navigationHandler(tag.name)}
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
