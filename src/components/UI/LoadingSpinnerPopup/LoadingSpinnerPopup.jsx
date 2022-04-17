import React from "react";
import { Modal } from "react-bootstrap";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./LoadingSpinnerPopup.scss";

const LoadingSpinnerPopup = ({ showSpinner }) => {
  return (
    <Modal
      className="loading-spinner"
      show={showSpinner}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Body>
        <LoadingSpinner />
      </Modal.Body>
    </Modal>
  );
};

export default LoadingSpinnerPopup;
