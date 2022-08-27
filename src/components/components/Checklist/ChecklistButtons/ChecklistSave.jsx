import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useSaveChecklistMutation,
  useUnsaveChecklistMutation,
} from "../../../../services/checklistService";
import { authSliceActions } from "../../../../store/authSlice";
import "./ChecklistSave.scss";

import { ReactComponent as Bookmark } from "../../../../assets/images/icon/bookmark.svg";

const ChecklistSave = ({ token, id, saved, navigate }) => {
  const [iSaved, setISaved] = useState(!!saved);
  const [saveChecklist, { data: saveData }] = useSaveChecklistMutation();
  const [unsaveChecklist, { data: unsaveData }] = useUnsaveChecklistMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!saveData) return;
    dispatch(authSliceActions.setSavedCounter(saveData.saved_counter));
  }, [saveData]);

  useEffect(() => {
    if (!unsaveData) return;
    dispatch(authSliceActions.setSavedCounter(unsaveData.saved_counter));
  }, [unsaveData]);

  const saveHandler = () => {
    if (!iSaved) saveChecklist(id);
    if (iSaved) unsaveChecklist(id);
    setISaved((prevState) => !prevState);
  };

  const loginHandler = () => {
    navigate(`/sign-in`);
  };

  return (
    <button
      onClick={token ? saveHandler : loginHandler}
      className={`checklist-save${iSaved ? " saved" : ""}`}
      type="button"
    >
      <Bookmark />
    </button>
  );
};

export default ChecklistSave;
