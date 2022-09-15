import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./CreationChecklistItemEdit.scss";

import { ReactComponent as TextIcon } from "../../../assets/images/icon/text.svg";
import { ReactComponent as ImgIcon } from "../../../assets/images/icon/imageIcon.svg";
import { ReactComponent as MapIcon } from "../../../assets/images/icon/map.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/images/icon/delete.svg";
import { ReactComponent as LinkIcon } from "../../../assets/images/icon/link.svg";

const CreationChecklistItemEdit = ({ typeChecklistHandler, id }) => {
  const checklists = useSelector(
    (state) => state.createChecklistReducer.checklist_items
  );
  const type = checklists.find((item) => item.id === id).list_type;
  const [isActive, setIsActive] = useState(type);
  const { t: translate } = useTranslation();
  const activeText = `checklist-edit__item${
    isActive === "text" ? " active" : ""
  }`;
  const activeLink = `checklist-edit__item${
    isActive === "link" ? " active" : ""
  }`;
  const activeImg = `checklist-edit__item${
    isActive === "image" ? " active" : ""
  }`;
  const activeMap = `checklist-edit__item${
    isActive === "coordinates" ? " active" : ""
  }`;

  const setIsActiveHandler = (str) => {
    if (str === "delete") {
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
    <nav
      className={`checklist-edit${
        isActive !== "text" ? " checklist-edit--margin" : ""
      }`}
    >
      <div className={activeText}>
        <button
          onClick={() => setIsActiveHandler("text")}
          className="checklist-edit__button"
          type="button"
          tabIndex="-1"
        >
          <TextIcon />
        </button>
        <span className="checklist-edit__desc">
          {translate("creationOfChecklist.textHover")}
        </span>
      </div>
      <div className={activeLink}>
        <button
          onClick={() => setIsActiveHandler("link")}
          className="checklist-edit__button"
          type="button"
          tabIndex="-1"
        >
          <LinkIcon />
        </button>
        <span className="checklist-edit__desc">
          {translate("creationOfChecklist.linkHover")}
        </span>
      </div>
      <div className={activeImg}>
        <button
          onClick={() => setIsActiveHandler("image")}
          className="checklist-edit__button"
          type="button"
          tabIndex="-1"
        >
          <ImgIcon />
        </button>
        <span className="checklist-edit__desc">
          {translate("creationOfChecklist.imageHover")}
        </span>
      </div>
      <div className={activeMap}>
        <button
          onClick={() => setIsActiveHandler("coordinates")}
          className="checklist-edit__button"
          type="button"
          tabIndex="-1"
        >
          <MapIcon />
        </button>
        <span className="checklist-edit__desc">
          {translate("creationOfChecklist.locationHover")}
        </span>
      </div>
      <div className="checklist-edit__item">
        <button
          onClick={() => setIsActiveHandler("delete")}
          className="checklist-edit__button"
          type="button"
          tabIndex="-1"
        >
          <DeleteIcon />
        </button>
        <span className="checklist-edit__desc">
          {translate("creationOfChecklist.deleteHover")}
        </span>
      </div>
    </nav>
  );
};

export default CreationChecklistItemEdit;
