import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteActiveChecklistMutation } from "../../../services/activeChecklistService";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import ChecklistCheckbox from "../ChecklistCheckbox/ChecklistCheckbox";
import isServerError from "../../../utils/isServerError";
import ProgressBarChecklist from "../ProgressBarChecklist/ProgressBarChecklist";
import getPercent from "../../../utils/getPercent";
import EditDropdown from "../EditDropdown/EditDropdown";
import "./ActiveChecklistDetail.scss";
import { authSliceActions } from "../../../store/authSlice";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

const ActiveChecklistDetail = ({ checklist }) => {
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [completedItemsCounter, setCompletedItemsCounter] = useState(
    checklist.completed_items_counter
  );
  const [totalItemsCounter, setTotalItemsCounter] = useState(
    checklist.total_items_counter
  );
  const [isChecklistPassed, setIsChecklistPassed] = useState(
    checklist.completed
  );

  const [
    deleteActiveChecklist,
    {
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      isLoading: isDeleteLoading,
      data: deleteData,
      error: deleteError,
    },
  ] = useDeleteActiveChecklistMutation();

  const user = useSelector((state) => state.authSliceReducer.user);
  const token = useSelector((state) => state.authSliceReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isDeleteSuccess) return;
    const { completed_percent } = deleteData.entities;
    dispatch(authSliceActions.setUser({ ...user, completed_percent }));
    navigate("/active-checklists?completed=false&page=1&per_page=10");
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (isServerError(deleteError?.status)) {
      navigate("/error", { replace: true });
    }
  }, [isDeleteError]);

  const onDownloadHandler = async () => {
    setIsDownloadLoading(true);

    const response = await fetch(
      `${HOSTNAME}/api/v1/active_checklists/${checklist.id}/download`,
      {
        method: "GET",
        headers: {
          Accept: "application/octet-stream",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = checklist.name;
    a.click();
    a.remove();
    setTimeout(() => window.URL.revokeObjectURL(url), 100);

    setIsDownloadLoading(false);
  };

  const onDeleteHandler = () => {
    deleteActiveChecklist({ id: checklist.id });
  };

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isDeleteLoading || isDownloadLoading} />
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
          downloadHandler={onDownloadHandler}
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
