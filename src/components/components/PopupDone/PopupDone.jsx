import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./PopupDone.scss";

import { ReactComponent as CompleteSvg } from "../../../assets/images/icon/popupDone.svg";
import { ReactComponent as PostedSvg } from "../../../assets/images/icon/posted.svg";
import { ReactComponent as ConfirmSvg } from "../../../assets/images/icon/confirm.svg";

const PopupDone = ({ show, onHide, onLookChecklist, page }) => {
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
              {page === "creation-of-checklist" &&
                translate("creationOfChecklist.popupTitle")}
              {page === "active-checklist" && translate("popupDone.title")}
              {page === "confirmation" && translate("popupConfirm.title")}
            </h4>
            <p className="create-done__text">
              {page === "creation-of-checklist" &&
                translate("creationOfChecklist.popupDesc")}
              {page === "active-checklist" && translate("popupDone.text")}
              {page === "confirmation" && translate("popupConfirm.text")}
            </p>
            {page === "creation-of-checklist" && (
              <button
                className="create-done__btn SFPro-500"
                onClick={onLookChecklist}
                type="button"
              >
                {translate("creationOfChecklist.lookChecklist")}
              </button>
            )}
            {(page === "active-checklist" || page === "confirmation") && (
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
            {page === "creation-of-checklist" && <PostedSvg />}
            {page === "active-checklist" && <CompleteSvg />}
            {page === "confirmation" && <ConfirmSvg />}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupDone;
