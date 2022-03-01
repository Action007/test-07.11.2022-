import React from "react";
import { Modal } from "react-bootstrap";
import GeneralMap from "../GeneralMap/GeneralMap";
import "./PopupMap.scss";

const PopupMap = ({ show, onHide }) => {
  return (
    <Modal
      className="popup-map"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" />
      </Modal.Header>
      <Modal.Body>
        <GeneralMap popup />
      </Modal.Body>
    </Modal>
  );
};

export default PopupMap;
