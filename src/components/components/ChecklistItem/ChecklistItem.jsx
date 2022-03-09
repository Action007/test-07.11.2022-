import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Modal } from "react-bootstrap";
import GeneralMap from "../GeneralMap/GeneralMap";
import PopupMap from "../PopupMap/PopupMap";
import "./ChecklistItem.scss";

import { ReactComponent as ExtendSvg } from "../../../assets/images/icon/expand-map.svg";

const ChecklistItem = ({ description, list_type, value }) => {
  const [showMap, setShowMap] = useState(false);
  const [showImage, setShowImage] = useState(false);

  return (
    <li className="checklist-item">
      <p>{description}</p>
      {list_type === "coordinates" && (
        <>
          <GeneralMap setShowMap={setShowMap} coordinates={value.coordinates} />
          <CSSTransition in={showMap} timeout={300} unmountOnExit>
            <PopupMap show={showMap} onHide={() => setShowMap(false)}>
              <GeneralMap coordinates={value.coordinates} popup />
            </PopupMap>
          </CSSTransition>
        </>
      )}
      {list_type === "image" && (
        <>
          <div className="checklist-item__image">
            <img src={value.image} alt="" />
            <button
              onClick={() => setShowImage(true)}
              className="checklist-item__extend"
              type="button"
            >
              <ExtendSvg />
            </button>
          </div>
          <Modal
            className="popup-image"
            show={showImage}
            onHide={setShowImage}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" />
            </Modal.Header>
            <Modal.Body>
              <img src={value.image} alt="" />
            </Modal.Body>
          </Modal>
        </>
      )}
    </li>
  );
};

export default ChecklistItem;
