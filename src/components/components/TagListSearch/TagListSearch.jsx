import React, { useEffect, useState } from "react";
import useKeyPress from "../../../hooks/useKeyPress";
import "./TagListSearch.scss";

const TagListSearch = ({ tags, findTypeHandler, page }) => {
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(
    page === "creation-of-checklist" ? null : 0
  );
  const [hovered, setHovered] = useState(undefined);

  useEffect(() => {
    if (page === "creation-of-checklist") return;
    if (tags.length && downPress) {
      setCursor((prevState) =>
        prevState < tags.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);
  useEffect(() => {
    if (page === "creation-of-checklist") return;
    if (tags.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);
  useEffect(() => {
    if (page === "creation-of-checklist") return;
    if (tags.length && enterPress) {
      findTypeHandler("click", tags[cursor]);
    }
  }, [cursor, enterPress]);
  useEffect(() => {
    if (page === "creation-of-checklist") return;
    if (tags.length && hovered) {
      setCursor(tags.indexOf(hovered));
    }
  }, [hovered]);

  return (
    <ul className="tag-list SFPro-400">
      {tags.length !== 0 &&
        tags.map((tag, index) => (
          <li
            className={`tag-list__item ${index === cursor ? "active" : ""}`}
            onMouseEnter={() => setHovered(tag)}
            onMouseLeave={() => setHovered(undefined)}
            key={tag.id}
          >
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
  );
};

export default TagListSearch;
