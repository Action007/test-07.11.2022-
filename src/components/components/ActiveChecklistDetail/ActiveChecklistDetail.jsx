import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ChecklistCheckbox from "../ChecklistCheckbox/ChecklistCheckbox";
import uniqueID from "../../../utils/uniqueID";
import "./ActiveChecklistDetail.scss";

import { ReactComponent as DeleteSvg } from "../../../assets/images/icon/trash.svg";
import { ReactComponent as UploadSvg } from "../../../assets/images/icon/upload.svg";
import { ReactComponent as ShareSvg } from "../../../assets/images/icon/share.svg";

const ActiveChecklistDetail = ({ checklist }) => {
  const [checklistItems, setChecklistItems] = useState(
    checklist.checklist_items
  );
  const { t: translate } = useTranslation();

  return (
    <div className="active-checklist">
      <h3 className="active-checklist__title SFPro-700">{checklist.name}</h3>
      <ol className="active-checklist__items">
        {checklistItems.map(
          ({ description, list_type, value, completed, id }) => {
            const idFor = uniqueID();
            return (
              <ChecklistCheckbox
                key={id}
                id={checklist.id}
                description={description}
                checklistItemId={id}
                list_type={list_type}
                value={value}
                idFor={idFor}
                completed={completed}
                setChecklistItems={setChecklistItems}
              />
            );
          }
        )}
      </ol>
      <div className="active-checklist__wrapper SFPro-500">
        <button className="active-checklist__btn" type="button">
          {translate("share")}
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
