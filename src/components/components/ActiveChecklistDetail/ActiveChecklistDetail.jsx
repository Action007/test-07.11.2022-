import React from "react";
import uniqueID from "../../../utils/uniqueId";
import "./ActiveChecklistDetail.scss";

const ActiveChecklistDetail = ({ checklist }) => {
  return (
    <div className="active-checklist">
      <h3 className="active-checklist__title SFPro-700">{checklist.name}</h3>
      <ol className="active-checklist__items">
        {checklist.checklist_items?.map(({ description }) => (
          <li className="active-checklist__item" key={uniqueID()}>
            {description}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ActiveChecklistDetail;
