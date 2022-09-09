import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Checklist from "../Checklist/Checklist";
import "./CreationChecklistPreview.scss";

const CreationChecklistPreview = ({ show, onHide }) => {
  const checklist_items = useSelector(
    (state) => state.createChecklistReducer.checklist_items
  );
  const user = useSelector((state) => state.authSliceReducer.user);
  const categories = useSelector(
    (state) => state.createChecklistReducer.category
  );
  const tags = useSelector((state) => state.createChecklistReducer.tags);
  const title = useSelector(
    (state) => state.createChecklistReducer.title.value
  );

  const checklist = {
    checklist_items,
    tags,
    categories,
    creator: user,
    name: title,
    viewed: 0,
    liked: 0,
    created_at: new Date().toISOString(),
  };

  return (
    <Modal
      className="popup-preview"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-0">
        <Checklist checklist={checklist} page="checklist-detail" isPreview />
        <Modal.Header closeButton />
      </Modal.Body>
    </Modal>
  );
};

export default CreationChecklistPreview;
