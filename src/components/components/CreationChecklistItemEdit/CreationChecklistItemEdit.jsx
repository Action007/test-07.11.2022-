import React, { useState } from "react";
import "./CreationChecklistItemEdit.scss";

import { ReactComponent as TextIcon } from "../../../assets/images/icon/text.svg";
import { ReactComponent as ImgIcon } from "../../../assets/images/icon/img.svg";
import { ReactComponent as MapIcon } from "../../../assets/images/icon/map.svg";
import { ReactComponent as TrashIcon } from "../../../assets/images/icon/trash.svg";

const CreationChecklistItemEdit = ({ typeChecklistHandler, id }) => {
  const [isActive, setIsActive] = useState("text");
  const activeText = `checklist-edit__item ${
    isActive === "text" ? " active" : ""
  }`;
  const activeImg = `checklist-edit__item ${
    isActive === "image" ? " active" : ""
  }`;
  const activeMap = `checklist-edit__item ${
    isActive === "map" ? " active" : ""
  }`;

  const setIsActiveHandler = (str) => {
    setIsActive(str);
    typeChecklistHandler(str, id);
  };

  return (
    <div className="checklist-edit">
      <button
        onClick={() => setIsActiveHandler("text")}
        className={activeText}
        type="button"
      >
        <TextIcon />
      </button>
      <button
        onClick={() => setIsActiveHandler("image")}
        className={activeImg}
        type="button"
      >
        <ImgIcon />
      </button>
      <button
        onClick={() => setIsActiveHandler("map")}
        className={activeMap}
        type="button"
      >
        <MapIcon />
      </button>
      <button
        onClick={() => setIsActiveHandler("delete")}
        className="checklist-edit__item"
        type="button"
      >
        <TrashIcon />
      </button>
    </div>
  );
};

export default CreationChecklistItemEdit;
