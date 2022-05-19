import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ChecklistImage from "../ChecklistImage/ChecklistImage";
import GeneralMap from "../GeneralMap/GeneralMap";
import PopupMap from "../PopupMap/PopupMap";
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
          <GeneralMap setShowMap={setShowMap} coordinates={value.coordinates} />
          <PopupMap show={showMap} onHide={() => setShowMap(false)}>
            <GeneralMap coordinates={value.coordinates} popup />
          </PopupMap>
        </>
      )}
      {list_type === "image" && (
        <ChecklistImage image={value.image} preview={preview} />
      )}
    </li>
  );
};

export default ChecklistItem;
