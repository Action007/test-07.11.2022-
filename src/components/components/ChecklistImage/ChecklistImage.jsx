import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./ChecklistImage.scss";

import { ReactComponent as ExtendSvg } from "../../../assets/images/icon/expand-map.svg";

const ChecklistImage = ({ image, alt, preview = false }) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      <div className="checklist-image">
        <img src={image} alt={alt} />
        {!preview && (
          <button
            onClick={() => setShowImage(true)}
            className="checklist-image__extend"
            type="button"
          >
            <ExtendSvg />
          </button>
        )}
      </div>
      <Modal
        className="checklist-image__popup"
        show={showImage}
        onHide={setShowImage}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" />
        </Modal.Header>
        <Modal.Body>
          <img src={image} alt={alt} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChecklistImage;
