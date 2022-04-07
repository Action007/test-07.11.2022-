import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./PopupLogout.scss";

import { ReactComponent as LogoutSvg } from "../../../assets/images/content/logoutPopup.svg";
import { ReactComponent as DoorSvg } from "../../../assets/images/icon/door.svg";

const PopupLogout = ({ show, onHide }) => {
  const { t: translate } = useTranslation();

  return (
    <Modal
      className="logout"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" />
      </Modal.Header>
      <Modal.Body>
        <div className="logout__wrapper">
          <div className="logout__wrap">
            <div className="logout__svg">
              <DoorSvg />
            </div>
            <h3 className="logout__title SFPro-600">
              {translate("logoutPopup.title")}
            </h3>
            <span className="logout__subtitle">
              {translate("logoutPopup.subtitle")}
            </span>
            <div className="logout__buttons SFPro-500">
              <button className="logout__button" type="button">
                {translate("logoutPopup.yes")}
              </button>
              <button className="logout__button" type="button">
                {translate("logoutPopup.no")}
              </button>
            </div>
          </div>
          <div className="logout__img">
            <LogoutSvg />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupLogout;
