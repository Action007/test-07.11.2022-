import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useCheckActiveChecklistItemMutation } from "../../../services/activeChecklistService";
import { authSliceActions } from "../../../store/authSlice";
import PopupDone from "../PopupDone/PopupDone";
import ChecklistImage from "../ChecklistImage/ChecklistImage";
import MapGeneral from "../MapGeneral/MapGeneral";
import MapModal from "../MapModal/MapModal";
import uniqueID from "../../../utils/uniqueID";
import "./ChecklistCheckbox.scss";

import { ReactComponent as LinkSvg } from "../../../assets/images/icon/link.svg";
import { ReactComponent as MapSvg } from "../../../assets/images/icon/mapIcon.svg";

const ChecklistCheckbox = ({
  id,
  index,
  checklistItemId,
  description,
  list_type,
  value,
  completed,
  setCompletedItemsCounter,
  setTotalItemsCounter,
  setIsChecklistPassed,
}) => {
  const user = useSelector((state) => state.authSliceReducer.user);

  const [checkChecklistItem, { isSuccess, data }] =
    useCheckActiveChecklistItemMutation();
  const [checked, setChecked] = useState(completed);
  const [showMap, setShowMap] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const { t: translate } = useTranslation();
  const isFor = uniqueID();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;
    const { completed_percent } = data.entities;
    dispatch(authSliceActions.setUser({ ...user, completed_percent }));

    if (data.entities.once_completed && data.entities.completed) {
      setModalShow(data.entities.once_completed);
    }
    setCompletedItemsCounter(data.entities.completed_items_counter);
    setTotalItemsCounter(data.entities.total_items_counter);
    setIsChecklistPassed(data.entities.completed);
  }, [isSuccess]);

  const checkboxHandler = () => {
    setChecked((prevState) => !prevState);
    checkChecklistItem({ id, checklist_item_id: checklistItemId });
  };

  return (
    <>
      <PopupDone
        show={modalShow}
        onHide={() => setModalShow(false)}
        page="active-checklist"
      />
      <li className={`checklist-checkbox${checked ? " checked" : ""}`}>
        <label className="checklist-checkbox__label" htmlFor={isFor}>
          <input
            defaultChecked={checked}
            onChange={checkboxHandler}
            id={isFor}
            type="checkbox"
          />
          <span className="checklist-checkbox__checkmark" />
          <span className="checklist-checkbox__num">{index + 1}.</span>
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
            {list_type === "coordinates" && (
              <a
                className="checklist-checkbox__map"
                href={`https://maps.google.com/?q=${value.coordinates.lat},${value.coordinates.lon}`}
                target="_blank"
                rel="noreferrer"
              >
                {translate("checklistReviewPage.map")}
                <MapSvg />
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
    </>
  );
};

export default ChecklistCheckbox;
