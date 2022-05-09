import React, { useEffect, useState } from "react";
import PopupCreateDone from "../PopupCreateDone/PopupCreateDone";
import uniqueID from "../../../utils/uniqueID";
import "./ActiveChecklistDetail.scss";

import { ReactComponent as DeleteSvg } from "../../../assets/images/icon/trash.svg";
import { ReactComponent as UploadSvg } from "../../../assets/images/icon/upload.svg";
import { ReactComponent as ShareSvg } from "../../../assets/images/icon/share.svg";
import ChecklistCheckbox from "../ChecklistCheckbox/ChecklistCheckbox";

const ActiveChecklistDetail = ({ checklist }) => {
  const [modalShow, setModalShow] = useState(checklist.completed);

  useEffect(() => {
    setModalShow(checklist.completed);
  }, [checklist.completed]);

  return (
    <>
      <div className="active-checklist">
        <h3 className="active-checklist__title SFPro-700">{checklist.name}</h3>
        <ol className="active-checklist__items">
          {checklist.checklist_items?.map(
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
                />
              );
            }
          )}
        </ol>
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
      <PopupCreateDone show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default ActiveChecklistDetail;
