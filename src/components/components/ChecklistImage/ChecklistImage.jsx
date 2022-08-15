import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./ChecklistImage.scss";

import brokenImg from "../../../assets/images/icon/brokenImg.png";
import { ReactComponent as ExtendSvg } from "../../../assets/images/icon/expand-map.svg";
import { ReactComponent as CancelIcon } from "../../../assets/images/icon/cancel.svg";

const ChecklistImage = ({ image, preview = false }) => {
  const [showImage, setShowImage] = useState(false);
  const [isValidImage, setIsValidImage] = useState(true);

  const onClickHandler = () => {
    if (isValidImage) setShowImage(true);
  };

  const onErrorImgHandler = (e) => {
    e.target.src = brokenImg;
    setIsValidImage(false);
  };

  return (
    <>
      <button
        className={`checklist-image${!isValidImage ? " invalid" : ""}`}
        onClick={onClickHandler}
        type="button"
      >
        <img onError={onErrorImgHandler} src={image} alt="" />
        {!preview && isValidImage && (
          <span className="checklist-image__extend">
            <ExtendSvg />
          </span>
        )}
      </button>
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
          <img src={image} alt="" />
          <button
            onClick={() => setShowImage(false)}
            className="close-modal"
            type="button"
          >
            <CancelIcon />
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChecklistImage;
