import React from "react";
import { Modal } from "react-bootstrap";
import MapGeneral from "../MapGeneral/MapGeneral";
import "./MapModal.scss";

import { ReactComponent as CancelIcon } from "../../../assets/images/icon/cancel.svg";

const MapModal = ({ show, onHide, coordinates, page, id }) => {
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
        <MapGeneral
          variant="modal"
          coordinates={coordinates}
          page={page}
          id={id}
        />
        <button onClick={onHide} className="close-modal" type="button">
          <CancelIcon />
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default MapModal;
