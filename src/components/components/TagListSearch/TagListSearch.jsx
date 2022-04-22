/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import useKeyPress from "../../../hooks/useKeyPress";
import "./TagListSearch.scss";

const TagListSearch = ({ tags, findTypeHandler }) => {
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  useEffect(() => {
    if (tags.length && downPress) {
      setCursor((prevState) =>
        prevState < tags.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);
  useEffect(() => {
    if (tags.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);
  useEffect(() => {
    if (tags.length && enterPress) {
      findTypeHandler("click", tags[cursor]);
    }
  }, [cursor, enterPress]);
  useEffect(() => {
    if (tags.length && hovered) {
      setCursor(tags.indexOf(hovered));
    }
  }, [hovered]);

  return (
    <ul className="tag-list">
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
