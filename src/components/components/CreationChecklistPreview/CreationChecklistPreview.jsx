import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ChecklistDetail from "../ChecklistDetail/ChecklistDetail";
import "./CreationChecklistPreview.scss";

const CreationChecklistPreview = ({ show, onHide }) => {
  const checklist_items = useSelector(
    (state) => state.createChecklistReducer.checklist_items
  );
  const tags = useSelector((state) => state.createChecklistReducer.tags);
  const title = useSelector(
    (state) => state.createChecklistReducer.title.value
  );
  const { t: translate } = useTranslation();

  const checklists = {
    checklist_items,
    tags,
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
      <Modal.Header closeButton>
        <Modal.Title
          className="popup-preview__title SFPro-600"
          id="contained-modal-title-vcenter"
        >
          {translate("creationOfChecklist.checklistPreview")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <ChecklistDetail checklists={checklists} />
      </Modal.Body>
    </Modal>
  );
};

export default CreationChecklistPreview;
