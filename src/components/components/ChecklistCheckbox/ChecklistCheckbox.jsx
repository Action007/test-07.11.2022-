import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../../../services/checklistService";
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
  const { t: translate } = useTranslation();

  useEffect(() => {
    if (data)
      setChecklistItems({
        checklist_items: data.entities.checklist_items,
        once_completed: data.entities.once_completed,
      });
  }, [isSuccess]);

  const checkboxHandler = () => {
    setChecked((prevState) => !prevState);
    checkChecklistItem({ id, checklist_item_id: checklistItemId });
  };

  return (
    <li className={`checklist-checkbox${checked ? " checked" : ""}`}>
      <label className="checklist-checkbox__label" htmlFor={idFor}>
        <input
          defaultChecked={checked}
          onChange={checkboxHandler}
          id={idFor}
          type="checkbox"
        />
        <span className="checklist-checkbox__checkmark" />
        <p className="checklist-checkbox__todo">
          {description}
          {list_type === "link" && (
            <a
              className="checklist-checkbox__link"
              href={value.link}
              target="_blank"
              rel="noreferrer"
            >
              {translate("checklistReviewPage.link")}
              <LinkSvg />
            </a>
          )}
        </p>
      </label>
      {list_type === "coordinates" && (
        <>
          <div className="map-container">
            {!showMap ? (
              <MapGeneral
                setShowMap={setShowMap}
                coordinates={value.coordinates}
              />
            ) : (
              <div className="map-fake" />
            )}
          </div>
          <MapModal
            show={showMap}
            onHide={() => setShowMap(false)}
            coordinates={value.coordinates}
          />
        </>
      )}
      {list_type === "image" && <ChecklistImage image={value.image} />}
    </li>
  );
};

export default ChecklistCheckbox;
