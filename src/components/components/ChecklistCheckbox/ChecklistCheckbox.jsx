import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../../../services/checklistService";
import PopupCreateDone from "../PopupCreateDone/PopupCreateDone";
import ChecklistImage from "../ChecklistImage/ChecklistImage";
import MapGeneral from "../MapGeneral/MapGeneral";
import MapModal from "../MapModal/MapModal";
import "./ChecklistCheckbox.scss";

import { ReactComponent as LinkSvg } from "../../../assets/images/icon/link.svg";

const ChecklistCheckbox = ({
  id,
  checklistItemId,
  description,
  list_type,
  value,
  idFor,
  completed,
  setChecklistItems,
}) => {
  const [checkChecklistItem, { isSuccess, data }] =
    checklistAPI.useCheckActiveChecklistItemMutation();
  const [checked, setChecked] = useState(completed);
  const [showMap, setShowMap] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const { t: translate } = useTranslation();

  useEffect(() => {
    if (!data) return;
    if (data.entities.once_completed && data.entities.completed) {
      setModalShow(data.entities.once_completed);
    }
    setChecklistItems(data.entities.checklist_items);
  }, [isSuccess]);

  const checkboxHandler = () => {
    setChecked((prevState) => !prevState);
    checkChecklistItem({ id, checklist_item_id: checklistItemId });
  };

  return (
    <>
      <li className={`checklist-checkbox${checked ? " checked" : ""}`}>
        <label className="checklist-checkbox__label" htmlFor={idFor}>
          <input
            defaultChecked={checked}
            onChange={checkboxHandler}
            id={idFor}
            type="checkbox"
          />
        </>
      )}
      {list_type === "image" && (
        <ChecklistImage image={value.image} alt={description} />
      )}
    </li>
  );
};

export default ChecklistCheckbox;
