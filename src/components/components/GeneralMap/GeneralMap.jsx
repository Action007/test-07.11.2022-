import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import LocationMarker from "../LocationMarker/LocationMarker";
import AddMarkerToMap from "../AddMarkerToMap/AddMarkerToMap";
import "./GeneralMap.scss";

import { ReactComponent as LocationSvg } from "../../../assets/images/icon/location.svg";
import { ReactComponent as TrashSvg } from "../../../assets/images/icon/trash.svg";
import { ReactComponent as ExtendSvg } from "../../../assets/images/icon/expand-map.svg";

const GeneralMap = ({
  setShowMap,
  coordinates = { lat: 51.505, lng: -0.09 },
  popup = false,
  creation,
  id,
}) => {
  const [showLocation, setShowLocation] = useState(false);
  const dispatch = useDispatch();
  const checklists = useSelector((state) => state.createChecklist.checklists);
  const checklist = checklists.find((item) => item.id === id);
  const removeMarkerHandler = () => {
    dispatch(createChecklistActions.removeCoordinate(id));
  };

  return (
    <div className="creation-map">
      <MapContainer center={coordinates} zoom={10} maxZoom={18}>
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        <LocationMarker show={showLocation} />
        <AddMarkerToMap
          coordinates={checklist.value.coordinates}
          id={id}
          creation={creation}
        />
      </MapContainer>
      {creation && checklist.value.coordinates ? (
        <button
          onClick={removeMarkerHandler}
          className="creation-map__del"
          type="button"
        >
          <TrashSvg />
        </button>
      ) : (
        ""
      )}
      <button
        onClick={() => setShowLocation([])}
        className="creation-map__location"
        type="button"
      >
        <LocationSvg />
      </button>
      {!popup && (
        <button
          onClick={() => setShowMap(true)}
          className="creation-map__extend"
          type="button"
        >
          <ExtendSvg />
        </button>
      )}
    </div>
  );
};

export default GeneralMap;
