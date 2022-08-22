import React, { useState } from "react";
import {
  useSaveChecklistMutation,
  useUnsaveChecklistMutation,
} from "../../../../services/checklistService";
import "./ChecklistSave.scss";

import { ReactComponent as Bookmark } from "../../../../assets/images/icon/bookmark.svg";

const ChecklistSave = ({ token, id, saved, navigate }) => {
  const [iSaved, setISaved] = useState(!!saved);
  const [saveChecklist] = useSaveChecklistMutation();
  const [unsaveChecklist] = useUnsaveChecklistMutation();

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
