import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./PopupLogout.scss";

import { ReactComponent as LogoutSvg } from "../../../assets/images/content/popupLogout.svg";
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
            <div className="logout__inner">
              <div className="logout__svg">
                <DoorSvg />
              </div>
              <h3 className="logout__title SFPro-600">
                {translate("popupLogout.title")}
              </h3>
            </div>
            <span className="logout__subtitle">
              {translate("popupLogout.subtitle")}
            </span>
            <div className="logout__buttons SFPro-500">
              <button className="logout__button" type="button">
                {translate("popupLogout.yes")}
              </button>
              <button className="logout__button" type="button">
                {translate("popupLogout.no")}
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
