import React from "react";
import { CSSTransition } from "react-transition-group";
import useClickOutside from "../../../hooks/useClickOutside";
import "./EditDropdown.scss";

import { ReactComponent as DotsSvg } from "../../../assets/images/icon/dots.svg";
import { ReactComponent as EditSvg } from "../../../assets/images/icon/edit.svg";
import { ReactComponent as DeleteSvg } from "../../../assets/images/icon/trash.svg";

const EditDropdown = ({
  commentID,
  onUpdateHandler,
  onDeleteHandler,
  componentType,
}) => {
  const { ref, show, setShowHandler } = useClickOutside();

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
          {componentType && componentType !== "comment" && (
            <button
              onClick={() => onUpdateHandler(commentID)}
              className="edit-dropdown__edit"
              type="button"
            >
              <EditSvg />
              Edit
            </button>
          )}
          <button
            onClick={() => onDeleteHandler(commentID)}
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
