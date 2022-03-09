import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import ChecklistImage from "../ChecklistImage/ChecklistImage";
import GeneralMap from "../GeneralMap/GeneralMap";
import PopupMap from "../PopupMap/PopupMap";
import "./ChecklistCheckbox.scss";

const ChecklistCheckbox = ({
  description,
  list_type,
  value,
  num,
  idFor,
  checklistsHandler,
}) => {
  const [checked, setChecked] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const checkboxHandler = () => {
    setChecked((prevState) => !prevState);
    checklistsHandler(true);
  };

  return (
    <li className="checklist-checkbox">
      <label className="checklist-checkbox__label" htmlFor={idFor}>
        <input
          defaultChecked={checked}
          onChange={checkboxHandler}
          id={idFor}
          type="checkbox"
        />
        <span className="checklist-checkbox__checkmark" />
        <span className="checklist-checkbox__number">{num}.</span>
        <p className="checklist-checkbox__todo">{description}</p>
      </label>
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
      {list_type === "image" && <ChecklistImage image={value.image} />}
    </li>
  );
};

export default ChecklistCheckbox;
