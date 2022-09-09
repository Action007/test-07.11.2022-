import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddActiveChecklistMutation } from "../../../../services/activeChecklistService";
import { authSliceActions } from "../../../../store/authSlice";
import LoadingSpinnerPopup from "../../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import "./ChecklistStartButton.scss";

import { ReactComponent as RightArrow } from "../../../../assets/images/icon/arrow.svg";

const ChecklistStartButton = ({
  token,
  id,
  setNotification,
  setLinkToActiveChecklist,
  navigate,
  translate,
}) => {
  const [
    addActiveChecklist,
    {
      data,
      isSuccess: isStartSuccess,
      isError: isStartError,
      isLoading,
      error: startError,
    },
  ] = useAddActiveChecklistMutation();

  const user = useSelector((state) => state.authSliceReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isStartSuccess) return;
    const { completed_percent } = data.entities;
    dispatch(authSliceActions.setUser({ ...user, completed_percent }));
    navigate(`/active-checklist/${data.entities.id}/${data.entities.slug}`);
  }, [isStartSuccess]);

  useEffect(() => {
    let showNotification;
    if (
      startError &&
      startError?.data?.message[0]?.error === "record_already_exist"
    ) {
      setNotification(true);
      setLinkToActiveChecklist(
        `/active-checklist/${startError.data.message[0].id}`
      );
      showNotification = setTimeout(() => {
        setNotification(false);
      }, 7000);
    }

    return () => {
      if (showNotification) clearTimeout(showNotification);
    };
  }, [isStartError]);

  const addActiveChecklistHandler = () => {
    if (token) {
      addActiveChecklist({ checklist_id: id });
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isLoading} />
      <button
        onClick={addActiveChecklistHandler}
        className="checklist-start SFPro-600"
        type="button"
      >
        <span>{translate("checklistReviewPage.button")}</span>
        <RightArrow />
      </button>
    </>
  );
};

export default ChecklistStartButton;
