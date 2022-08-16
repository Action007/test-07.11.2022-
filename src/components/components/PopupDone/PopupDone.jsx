import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import "./PopupDone.scss";

import { ReactComponent as CompleteSvg } from "../../../assets/images/icon/popupDone.svg";
import { ReactComponent as PostedSvg } from "../../../assets/images/icon/posted.svg";
import { ReactComponent as ConfirmSvg } from "../../../assets/images/icon/confirm.svg";

const PopupDone = ({ show, onHide, onLookChecklist }) => {
  const { pathname } = useLocation();
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
              {pathname === "/creation-of-checklist" &&
                translate("creationOfChecklist.popupTitle")}
              {pathname === "/active-checklist" && translate("popupDone.title")}
              {pathname === "/confirmation" && translate("popupConfirm.title")}
            </h4>
            <p className="create-done__text">
              {pathname === "/creation-of-checklist" &&
                translate("creationOfChecklist.popupDesc")}
              {pathname === "/active-checklist" && translate("popupDone.text")}
              {pathname === "/confirmation" && translate("popupConfirm.text")}
            </p>
            {pathname === "/creation-of-checklist" && (
              <button
                className="create-done__btn SFPro-500"
                onClick={onLookChecklist}
                type="button"
              >
                {translate("creationOfChecklist.lookChecklist")}
              </button>
            )}
            {(pathname === "/active-checklist" ||
              pathname === "/confirmation") && (
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
            {pathname === "/creation-of-checklist" && <PostedSvg />}
            {pathname === "/active-checklist" && <CompleteSvg />}
            {pathname === "/confirmation" && <ConfirmSvg />}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupDone;
