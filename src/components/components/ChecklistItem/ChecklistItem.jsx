import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ChecklistImage from "../ChecklistImage/ChecklistImage";
import MapGeneral from "../MapGeneral/MapGeneral";
import MapModal from "../MapModal/MapModal";
import "./ChecklistItem.scss";

import { ReactComponent as LinkSvg } from "../../../assets/images/icon/link.svg";
import { ReactComponent as MapSvg } from "../../../assets/images/icon/mapIcon.svg";

const ChecklistItem = ({ description, list_type, value, completed }) => {
  const [showMap, setShowMap] = useState(false);
  const { t: translate } = useTranslation();

  return (
    <li className={`checklist-item${completed ? " completed" : ""}`}>
      <p>
        {description}
        {list_type === "link" && (
          <a
            className="checklist-item__link"
            href={value.link}
            target="_blank"
            rel="noreferrer"
          >
            {translate("checklistReviewPage.link")}
            <LinkSvg />
          </a>
        )}
        {list_type === "coordinates" && (
          <a
            className="checklist-item__map"
            href={`https://maps.google.com/?q=${value.coordinates.lat},${value.coordinates.lon}`}
            target="_blank"
            rel="noreferrer"
          >
            {translate("checklistReviewPage.map")}
            <MapSvg />
          </a>
        )}
      </p>
      {list_type === "coordinates" && (
        <>
          {!showMap ? (
            <MapGeneral
              setShowMap={setShowMap}
              coordinates={value.coordinates}
            />
          ) : (
            <div className="map-fake" />
          )}
          <MapModal
            show={showMap}
            onHide={() => setShowMap(false)}
            coordinates={value.coordinates}
          />
        </>
      )}
      {list_type === "image" && (
        <ChecklistImage image={value.image} alt={description} />
      )}
    </li>
  );
};

export default ChecklistItem;
