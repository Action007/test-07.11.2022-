import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
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
  const { t: translate } = useTranslation();
  const [text, setText] = useState(translate("allChecklistsPage.save"));

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
    if (!iSaved) {
      setText(translate("allChecklistsPage.saved"));
    } else {
      setText(translate("allChecklistsPage.save"));
    }
    if (!iSaved) saveChecklist(id);
    if (iSaved) unsaveChecklist(id);
    setISaved((prevState) => !prevState);
  };

  const loginHandler = () => {
    navigate(`/sign-in`);
  };

  return (
    <div className="checklist-save-button SFPro-500">
      <button
        onClick={token ? saveHandler : loginHandler}
        className={`checklist-save${iSaved ? " checklist-save--saved" : ""}`}
        type="button"
      >
        <Bookmark />
      </button>
      <span className="checklist-save-button__desc">{text}</span>
    </div>
  );
};

export default ChecklistSave;
