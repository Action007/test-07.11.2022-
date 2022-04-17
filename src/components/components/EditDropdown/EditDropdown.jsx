import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { checklistAPI } from "../../../services/checklistService";
import PopupDelete from "../PopupDelete/PopupDelete";
import useClickOutside from "../../../hooks/useClickOutside";
import "./EditDropdown.scss";

import { ReactComponent as DotsSvg } from "../../../assets/images/icon/dots.svg";
import { ReactComponent as EditSvg } from "../../../assets/images/icon/edit.svg";
import { ReactComponent as DeleteSvg } from "../../../assets/images/icon/trash.svg";

const EditDropdown = ({ id }) => {
  const [modalShow, setModalShow] = useState(false);
  const { ref, show, setShowHandler } = useClickOutside();
  const navigate = useNavigate();
  // eslint-disable-next-line no-empty-pattern
  const [deleteChecklist, {}] = checklistAPI.useDeleteChecklistMutation();

  const onDeleteClickHandler = () => {
    deleteChecklist(id);
    setModalShow(false);
  };

  return (
    <>
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
              onClick={() => setModalShow(true)}
              className="edit-dropdown__delete"
              type="button"
            >
              <DeleteSvg />
              Delete
            </button>
          </div>
        </CSSTransition>
      </div>
      <PopupDelete
        deleteClickHandler={onDeleteClickHandler}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default EditDropdown;
