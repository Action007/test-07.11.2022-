import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDeleteActiveChecklistMutation } from "../../../services/activeChecklistService";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import ChecklistCheckbox from "../ChecklistCheckbox/ChecklistCheckbox";
import isServerError from "../../../utils/isServerError";
import ProgressBarChecklist from "../ProgressBarChecklist/ProgressBarChecklist";
import getPercent from "../../../utils/getPercent";
import "./ActiveChecklistDetail.scss";

import { ReactComponent as DeleteSvg } from "../../../assets/images/icon/trash.svg";
import { ReactComponent as UploadSvg } from "../../../assets/images/icon/upload.svg";
import { ReactComponent as ShareSvg } from "../../../assets/images/icon/share.svg";

const ActiveChecklistDetail = ({ checklist }) => {
  const [completedItemsCounter, setCompletedItemsCounter] = useState(
    checklist.completed_items_counter
  );
  const [totalItemsCounter, setTotalItemsCounter] = useState(
    checklist.total_items_counter
  );

  const [deleteActiveChecklist, { isSuccess, isError, error, isLoading }] =
    useDeleteActiveChecklistMutation();

  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/active-checklists?completed=false&page=1&per_page=10");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isServerError(error?.status)) navigate("/error", { replace: true });
  }, [isError]);

  const onDeleteHandler = () => {
    deleteActiveChecklist({ id: checklist.id });
  };

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isLoading} />
      <ProgressBarChecklist
        done={getPercent(completedItemsCounter, totalItemsCounter)}
      />
      <div className="active-checklist">
        <h3 className="active-checklist__title SFPro-700">{checklist.name}</h3>
        <ul className="active-checklist__items">
          {checklist.checklist_items.map(
            ({ description, list_type, value, completed, id }, index) => (
              <ChecklistCheckbox
                key={id}
                index={index}
                id={checklist.id}
                description={description}
                checklistItemId={id}
                list_type={list_type}
                value={value}
                completed={completed}
                setCompletedItemsCounter={setCompletedItemsCounter}
                setTotalItemsCounter={setTotalItemsCounter}
              />
            )
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
