import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDeleteActiveChecklistMutation } from "../../../services/activeChecklistService";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import ChecklistCheckbox from "../ChecklistCheckbox/ChecklistCheckbox";
import uniqueID from "../../../utils/uniqueID";
import "./ActiveChecklistDetail.scss";

import { ReactComponent as DeleteSvg } from "../../../assets/images/icon/trash.svg";
import { ReactComponent as UploadSvg } from "../../../assets/images/icon/upload.svg";
import { ReactComponent as ShareSvg } from "../../../assets/images/icon/share.svg";

const ActiveChecklistDetail = ({ checklist }) => {
  const [checkChecklistItem, { isSuccess, isError, error, isLoading }] =
    useDeleteActiveChecklistMutation();
  const [checklistItems, setChecklistItems] = useState(
    checklist.checklist_items
  );
  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/active-checklists?completed=false&page=1&per_page=10");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) return;

    if (error && error?.data?.error === "not_found") {
      navigate("/not-found", { replace: true });
    } else {
      navigate("/error", { replace: true });
    }
  }, [isSuccess, isError]);

  const onDeleteHandler = () => {
    checkChecklistItem({ id: checklist.id });
  };

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isLoading} />
      <div className="active-checklist">
        <h3 className="active-checklist__title SFPro-700">{checklist.name}</h3>
        <ul className="active-checklist__items">
          {checklistItems.map(
            ({ description, list_type, value, completed, id }, index) => {
              const idFor = uniqueID();
              return (
                <ChecklistCheckbox
                  key={id}
                  index={index}
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
        </ul>
        <div className="active-checklist__wrapper SFPro-500">
          <button className="active-checklist__btn" type="button">
            {translate("share")}
            <ShareSvg />
          </button>
          <button className="active-checklist__btn" type="button">
            <UploadSvg />
          </button>
          <button
            onClick={onDeleteHandler}
            className="active-checklist__btn"
            type="button"
          >
            <DeleteSvg />
          </button>
        </div>
      </div>
    </>
  );
};

export default ActiveChecklistDetail;
