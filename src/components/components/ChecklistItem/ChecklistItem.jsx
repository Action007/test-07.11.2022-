import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ChecklistImage from "../ChecklistImage/ChecklistImage";
import MapGeneral from "../MapGeneral/MapGeneral";
import MapModal from "../MapModal/MapModal";
import "./ChecklistItem.scss";

import { ReactComponent as LinkSvg } from "../../../assets/images/icon/link.svg";

const ChecklistItem = ({ description, list_type, value, preview }) => {
  const [showMap, setShowMap] = useState(false);
  const { t: translate } = useTranslation();
  const test = /^(http|https):\/\//i;
  const link = test.test(value?.link) ? value?.link : `https://${value?.link}`;

  return (
    <li className="checklist-item">
      <p>
        {description}
        {list_type === "link" && (
          <a
            className="checklist-item__link"
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            {translate("checklistReviewPage.link")}
            <LinkSvg />
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
        <ChecklistImage image={value.image} preview={preview} />
      )}
    </li>
  );
};

export default ChecklistItem;
