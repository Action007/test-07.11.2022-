import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import useClickOutside from "../../../hooks/useClickOutside";
import "./EditDropdown.scss";

import { ReactComponent as DotsSvg } from "../../../assets/images/icon/dots.svg";
import { ReactComponent as EditSvg } from "../../../assets/images/icon/edit.svg";
import { ReactComponent as DeleteSvg } from "../../../assets/images/icon/trash.svg";
import { ReactComponent as DownloadSvg } from "../../../assets/images/icon/download.svg";

const EditDropdown = ({
  deleteHandler,
  downloadHandler,
  id,
  isEdit = false,
  isActiveChecklist = false,
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
          {isEdit && (
            <button className="edit-dropdown__edit" type="button">
              <Link
                to={`/edit-checklist/${id}`}
                className="edit-dropdown__edit"
                type="button"
              >
                <EditSvg />
                Edit
              </Link>
            </button>
          )}
          {isActiveChecklist && (
            <button
              onClick={downloadHandler}
              className="edit-dropdown__download"
              type="button"
            >
              <DownloadSvg />
              Download
            </button>
          )}
          <button
            onClick={deleteHandler}
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
