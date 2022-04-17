import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./PopupDelete.scss";

import { ReactComponent as DeleteSvg } from "../../../assets/images/content/popupDelete.svg";
import { ReactComponent as TrashIcon } from "../../../assets/images/icon/trash.svg";

const PopupDelete = ({ show, onHide, deleteClickHandler }) => {
  const { t: translate } = useTranslation();

  return (
    <Modal
      className="delete-popup"
      show={show}
      onHide={onHide}
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" />
      </Modal.Header>
      <Modal.Body>
        <div className="delete-popup__wrapper">
          <div className="delete-popup__wrap">
            <div className="delete-popup__inner">
              <div className="delete-popup__svg">
                <TrashIcon />
              </div>
              <h3 className="delete-popup__title SFPro-600">
                {translate("popupDelete.title")}
              </h3>
            </div>
            <span className="delete-popup__subtitle">
              {translate("popupDelete.subtitle")}
            </span>
            <div className="delete-popup__buttons SFPro-500">
              <button
                onClick={deleteClickHandler}
                className="delete-popup__button"
                type="button"
              >
                {translate("popupDelete.yes")}
              </button>
              <button
                onClick={onHide}
                className="delete-popup__button"
                type="button"
              >
                {translate("popupDelete.no")}
              </button>
            </div>
          </div>
          <div className="delete-popup__img">
            <DeleteSvg />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupDelete;
