import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import uniqueID from "../../../utils/uniqueId";
import GeneralMap from "../GeneralMap/GeneralMap";
import PopupMap from "../PopupMap/PopupMap";
import "./ChecklistItem.scss";

const ChecklistItem = ({ description, list_type, value }) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <li className="checklist-item" key={uniqueID()}>
      <p>{description}</p>
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
      {list_type === "image" && (
        <div className="checklist-item__image">
          <img src={value.image} alt="" />
        </div>
      )}
    </li>
  );
};

export default ChecklistItem;
