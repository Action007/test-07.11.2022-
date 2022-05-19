import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../../../services/checklistService";
import ChecklistImage from "../ChecklistImage/ChecklistImage";
import GeneralMap from "../GeneralMap/GeneralMap";
import PopupMap from "../PopupMap/PopupMap";
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
}) => {
  // eslint-disable-next-line no-empty-pattern
  const [checkChecklistItem, {}] =
    checklistAPI.useCheckActiveChecklistItemMutation();
  const [checked, setChecked] = useState(completed);
  const [showMap, setShowMap] = useState(false);
  const test = /^(http|https):\/\//i;
  const link = test.test(value.link) ? value.link : `https://${value.link}`;
  const { t: translate } = useTranslation();

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
              href={link}
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
          <GeneralMap setShowMap={setShowMap} coordinates={value.coordinates} />
          <PopupMap show={showMap} onHide={() => setShowMap(false)}>
            <GeneralMap coordinates={value.coordinates} popup />
          </PopupMap>
        </>
      )}
      {list_type === "image" && <ChecklistImage image={value.image} />}
    </li>
  );
};

export default ChecklistCheckbox;
