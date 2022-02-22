import React, { useState } from "react";
import uniqueID from "../../../utils/uniqueId";
import "./ChecklistCheckbox.scss";

const ChecklistCheckbox = ({ description, id, idFor, checklistsHandler }) => {
  const [checked, setChecked] = useState(false);

  const checkboxHandler = () => {
    setChecked((prevState) => !prevState);
    checklistsHandler(true);
  };

  return (
    <li className="checklist-checkbox" key={uniqueID()}>
      <form className="checklist-checkbox__form">
        <label className="checklist-checkbox__label" htmlFor={idFor}>
          <input
            defaultChecked={checked}
            onChange={checkboxHandler}
            id={idFor}
            type="checkbox"
          />
          <span className="checklist-checkbox__checkmark" />
          <span className="checklist-checkbox__number">{id + 1}.</span>
          <p className="checklist-checkbox__todo m-0">{description}</p>
        </label>
      </form>
    </li>
  );
};

export default ChecklistCheckbox;
