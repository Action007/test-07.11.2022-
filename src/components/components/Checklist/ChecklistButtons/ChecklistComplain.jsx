import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Complain from "../../Complain/Complain";
import "./ChecklistComplain.scss";

import { ReactComponent as InfoSvg } from "../../../../assets/images/icon/info.svg";

const ChecklistComplain = ({ token, id, name, navigate, translate }) => {
  const [showComplain, setShowComplain] = useState(false);

  const complainHandler = () => {
    if (token) {
      setShowComplain(true);
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <>
      <Modal
        className="popup-complain"
        show={showComplain}
        onHide={setShowComplain}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" />
        </Modal.Header>
        <Modal.Body>
          <Complain
            closeHandler={() => setShowComplain(false)}
            id={id}
            name={name}
          />
        </Modal.Body>
      </Modal>
      <div className="complain-dropdown SFPro-500">
        <button
          onClick={complainHandler}
          className="complain-dropdown__info"
          type="button"
        >
          <InfoSvg />
        </button>
        <span className="complain-dropdown__desc">
          {translate("supportPage.button")}
        </span>
      </div>
    </>
  );
};

export default ChecklistComplain;
