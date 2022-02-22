import React from "react";
import { CSSTransition } from "react-transition-group";
import useDropdown from "../../../hooks/useDropdown";
import "./EditDropdown.scss";

import { ReactComponent as DotsSvg } from "../../../assets/images/icon/dots.svg";
import { ReactComponent as EditSvg } from "../../../assets/images/icon/edit.svg";
import { ReactComponent as DeleteSvg } from "../../../assets/images/icon/delete.svg";

const EditDropdown = () => {
  const { ref, show, setShowHandler } = useDropdown();

  return (
    <div className="edit-dropdown SFPro-500" ref={ref}>
      <button
        onClick={setShowHandler}
        className="edit-dropdown__button"
        variant="success"
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
          <button className="edit-dropdown__edit" type="button">
            <EditSvg />
            Edit
          </button>
          <button className="edit-dropdown__delete" type="button">
            <DeleteSvg />
            Delete
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default EditDropdown;
