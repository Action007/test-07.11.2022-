import React, { useEffect, useState } from "react";
import useKeyPress from "../../../hooks/useKeyPress";
import "./TagListSearch.scss";

const TagListSearch = ({ tags, findTypeHandler }) => {
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(-1);
  const [hovered, setHovered] = useState(undefined);

  useEffect(() => {
    if (tags.length && downPress) {
      setCursor((prevState) => {
        if (prevState === -2) return prevState + 2;
        if (prevState < tags.length - 1) return prevState + 1;
        return prevState;
      });
    }
    if (tags.length - 1 === cursor && tags.length && downPress) {
      setCursor(-2);
    }
    if (cursor === tags.length) {
      setCursor(0);
    }
  }, [downPress]);

  useEffect(() => {
    if (tags.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
    if (cursor === 0 && tags.length && upPress) {
      setCursor(tags.length);
    }
    if (cursor === -2) {
      setCursor(tags.length - 1);
    }
  }, [upPress]);

  useEffect(() => {
    if (tags.length && enterPress) {
      findTypeHandler("click", tags[cursor]);
    }
  }, [cursor, enterPress]);

  useEffect(() => {
    if (tags.length && hovered) setCursor(tags.indexOf(hovered));
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
