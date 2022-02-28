import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import LocationMarker from "../LocationMarker/LocationMarker";
import AddMarkerToMap from "../AddMarkerToMap/AddMarkerToMap";
import CreationChecklistMapSearch from "../CreationChecklistMapSearch/CreationChecklistMapSearch";
import "./CreationChecklistMap.scss";

import { ReactComponent as LocationSvg } from "../../../assets/images/icon/location.svg";
import { ReactComponent as TrashSvg } from "../../../assets/images/icon/trash.svg";
import { ReactComponent as ExtendSvg } from "../../../assets/images/icon/expand-map.svg";

const CreationChecklistMap = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const markers = useSelector((state) => state.createChecklist.markers);

  const removeMarkerHandler = () => {
    dispatch(createChecklistActions.removeCoordinate());
  };

  return (
    <div className="creation-map">
      <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={10} maxZoom={20}>
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        <LocationMarker show={show} />
        <AddMarkerToMap />
        <CreationChecklistMapSearch />
      </MapContainer>
      {markers.length ? (
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
        onClick={() => setShow([])}
        className="creation-map__location"
        type="button"
      >
        <LocationSvg />
      </button>
      <button
        onClick={() => setShow([])}
        className="creation-map__extend"
        type="button"
      >
        <ExtendSvg />
      </button>
    </div>
  );
};

export default CreationChecklistMap;
