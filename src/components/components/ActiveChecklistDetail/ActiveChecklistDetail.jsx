import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteActiveChecklistMutation } from "../../../services/activeChecklistService";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import ChecklistCheckbox from "../ChecklistCheckbox/ChecklistCheckbox";
import isServerError from "../../../utils/isServerError";
import ProgressBarChecklist from "../ProgressBarChecklist/ProgressBarChecklist";
import getPercent from "../../../utils/getPercent";
import EditDropdown from "../EditDropdown/EditDropdown";
import "./ActiveChecklistDetail.scss";

const ActiveChecklistDetail = ({ checklist }) => {
  const [completedItemsCounter, setCompletedItemsCounter] = useState(
    checklist.completed_items_counter
  );
  const [totalItemsCounter, setTotalItemsCounter] = useState(
    checklist.total_items_counter
  );
  const [isChecklistPassed, setIsChecklistPassed] = useState(
    checklist.completed
  );

  const [deleteActiveChecklist, { isSuccess, isError, error, isLoading }] =
    useDeleteActiveChecklistMutation();

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
        <h3
          className={`active-checklist__title SFPro-700${
            isChecklistPassed ? " active-checklist__title--passed" : ""
          }`}
        >
          {checklist.name}
        </h3>
        <EditDropdown
          navigate={navigate}
          deleteHandler={onDeleteHandler}
          isActiveChecklist
        />
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
                setIsChecklistPassed={setIsChecklistPassed}
              />
            )
          )}
        </ul>
      </div>
    </>
  );
};

export default ActiveChecklistDetail;
