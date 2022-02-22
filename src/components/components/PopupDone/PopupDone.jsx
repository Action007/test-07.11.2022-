import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./PopupDone.scss";

import PopupImg from "../../../assets/images/content/popupDone.png";

const PopupDone = ({ show, onHide }) => {
  const { t: translate } = useTranslation();

  return (
    <Modal
      className="popup-done"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" />
      </Modal.Header>
      <Modal.Body>
        <div className="popup-done__wrapper">
          <div className="popup-done__wrap">
            <h4 className="popup-done__title SFPro-600">
              {translate("popupDone.title")}
            </h4>
            <p className="popup-done__text">{translate("popupDone.text")}</p>
            <button
              className="popup-done__btn SFPro-500"
              onClick={onHide}
              type="button"
            >
              {translate("popupDone.button")}
            </button>
          </div>
          <div className="popup-done__img">
            <img src={PopupImg} alt="winner's Cup" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupDone;
