import React, { useEffect } from "react";
import { useAddActiveChecklistMutation } from "../../../../services/activeChecklistService";
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

  useEffect(() => {
    if (isStartSuccess) {
      navigate(`/active-checklist/${data.entities.id}/${data.entities.slug}`);
    }
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
