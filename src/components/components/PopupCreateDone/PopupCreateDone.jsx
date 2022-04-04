import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./PopupCreateDone.scss";

import { Link } from "react-router-dom";
import PopupImg from "../../../assets/images/content/popupDone.png";
import PostedImg from "../../../assets/images/content/posted.png";

const PopupCreateDone = ({ show, onHide, preview = false }) => {
  const { t: translate } = useTranslation();

  return (
    <Modal
      className="create-done"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" />
      </Modal.Header>
      <Modal.Body>
        <div className="create-done__wrapper">
          <div className="create-done__wrap">
            <h4 className="create-done__title SFPro-600">
              {preview
                ? translate("creationOfChecklist.popupTitle")
                : translate("popupDone.title")}
            </h4>
            <p className="create-done__text">
              {preview
                ? translate("creationOfChecklist.popupDesc")
                : translate("popupDone.text")}
            </p>
            {preview ? (
              <Link className="create-done__btn SFPro-500" to="/home">
                {translate("creationOfChecklist.popupButton")}
              </Link>
            ) : (
              <button
                className="create-done__btn SFPro-500"
                onClick={onHide}
                type="button"
              >
                {translate("popupDone.button")}
              </button>
            )}
          </div>
          <div className="create-done__img">
            {preview ? (
              <img src={PostedImg} alt="checklist posted" />
            ) : (
              <img src={PopupImg} alt="winner's Cup" />
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupCreateDone;
