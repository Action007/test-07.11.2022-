import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./CreationChecklistItemEdit.scss";

import { ReactComponent as TextIcon } from "../../../assets/images/icon/text.svg";
import { ReactComponent as ImgIcon } from "../../../assets/images/icon/img.svg";
import { ReactComponent as MapIcon } from "../../../assets/images/icon/map.svg";
import { ReactComponent as TrashIcon } from "../../../assets/images/icon/trash.svg";
import { ReactComponent as LinkIcon } from "../../../assets/images/icon/link.svg";

const CreationChecklistItemEdit = ({ typeChecklistHandler, id, setFadeIn }) => {
  const checklists = useSelector(
    (state) => state.createChecklistReducer.checklist_items
  );
  const type = checklists.find((item) => item.id === id).list_type;
  const [isActive, setIsActive] = useState(type);
  const activeText = `checklist-edit__item ${
    isActive === "text" ? " active" : ""
  }`;
  const activeLink = `checklist-edit__item ${
    isActive === "link" ? " active" : ""
  }`;
  const activeImg = `checklist-edit__item ${
    isActive === "image" ? " active" : ""
  }`;
  const activeMap = `checklist-edit__item ${
    isActive === "coordinates" ? " active" : ""
  }`;

  const setIsActiveHandler = (str) => {
    if (str === "delete") {
      setFadeIn("");
      setTimeout(() => {
        setIsActive(str);
        typeChecklistHandler(str, id);
      }, 300);
      return;
    }
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
        onClick={() => setIsActiveHandler("link")}
        className={activeLink}
        type="button"
      >
        <LinkIcon />
      </button>
      <button
        onClick={() => setIsActiveHandler("image")}
        className={activeImg}
        type="button"
      >
        <ImgIcon />
      </button>
      <button
        onClick={() => setIsActiveHandler("coordinates")}
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
