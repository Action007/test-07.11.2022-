import React from "react";
import { Modal } from "react-bootstrap";
import "./PopupMap.scss";

const PopupMap = ({ show, onHide, children }) => {
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
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default PopupMap;
