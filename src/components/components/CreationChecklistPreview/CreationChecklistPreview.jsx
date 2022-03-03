import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import ChecklistDetail from "../ChecklistDetail/ChecklistDetail";
import "./CreationChecklistPreview.scss";

const CreationChecklistPreview = ({ show, onHide }) => {
  const checklist = useSelector((state) => state.createChecklist.checklists);
  const tags = useSelector((state) => state.createChecklist.tags);
  const title = useSelector((state) => state.createChecklist.title);
  const checklists = {
    checklist,
    tags,
    title,
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" />
      </Modal.Header>
      <Modal.Body className="p-0">
        <ChecklistDetail checklists={checklists} preview />
      </Modal.Body>
    </Modal>
  );
};

export default CreationChecklistPreview;
