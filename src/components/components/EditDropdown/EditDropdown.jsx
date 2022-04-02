import React from "react";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { checklistAPI } from "../../../services/checklistService";
import useClickOutside from "../../../hooks/useClickOutside";
import "./EditDropdown.scss";

import { ReactComponent as DotsSvg } from "../../../assets/images/icon/dots.svg";
import { ReactComponent as EditSvg } from "../../../assets/images/icon/edit.svg";
import { ReactComponent as DeleteSvg } from "../../../assets/images/icon/delete.svg";

const EditDropdown = ({ id }) => {
  const { ref, show, setShowHandler } = useClickOutside();
  const navigate = useNavigate();
  // eslint-disable-next-line no-empty-pattern
  const [deleteChecklist, {}] = checklistAPI.useDeleteChecklistMutation();

  const onDeleteClickHandler = () => deleteChecklist(id);

  return (
    <div className="edit-dropdown SFPro-500" ref={ref}>
      <button
        onClick={setShowHandler}
        className="edit-dropdown__button"
        type="button"
      >
        <DotsSvg />
      </button>
      <CSSTransition
        classNames="editDropdown"
        in={show}
        timeout={300}
        unmountOnExit
      >
        <div className="edit-dropdown__menu">
          <button
            onClick={() => navigate(`/edit-checklist/${id}`)}
            className="edit-dropdown__edit"
            type="button"
          >
            <EditSvg />
            Edit
          </button>
          <button
            onClick={onDeleteClickHandler}
            className="edit-dropdown__delete"
            type="button"
          >
            <DeleteSvg />
            Delete
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default EditDropdown;
