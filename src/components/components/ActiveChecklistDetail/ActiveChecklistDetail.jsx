import React from "react";
import uniqueID from "../../../utils/uniqueId";
import "./ActiveChecklistDetail.scss";

import { ReactComponent as DeleteSvg } from "../../../assets/images/icon/delete.svg";
import { ReactComponent as UploadSvg } from "../../../assets/images/icon/upload.svg";
import { ReactComponent as ShareSvg } from "../../../assets/images/icon/share.svg";
import ChecklistCheckbox from "../ChecklistCheckbox/ChecklistCheckbox";

const ActiveChecklistDetail = ({ checklist, checklistsHandler }) => {
  return (
    <div className="active-checklist">
      <h3 className="active-checklist__title SFPro-700">{checklist.name}</h3>
      <ul className="active-checklist__items">
        {checklist.checklist_items?.map(({ description }, id) => {
          const idFor = uniqueID();
          return (
            <ChecklistCheckbox
              description={description}
              id={id}
              idFor={idFor}
              checklistsHandler={checklistsHandler}
            />
          );
        })}
      </ul>
      <div className="active-checklist__wrapper SFPro-500">
        <button className="active-checklist__btn" type="button">
          Share
          <ShareSvg />
        </button>
        <button className="active-checklist__btn" type="button">
          <UploadSvg />
        </button>
        <button className="active-checklist__btn" type="button">
          <DeleteSvg />
        </button>
      </div>
    </div>
  );
};

export default ActiveChecklistDetail;
