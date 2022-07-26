import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import CreationChecklistMapSearch from "../CreationChecklistMapSearch/CreationChecklistMapSearch";
import LocationMarker from "../LocationMarker/LocationMarker";
import AddMarkerToMap from "../AddMarkerToMap/AddMarkerToMap";
import "./MapGeneral.scss";

import { ReactComponent as LocationSvg } from "../../../assets/images/icon/location.svg";
import { ReactComponent as ExtendSvg } from "../../../assets/images/icon/expand-map.svg";

const MapGeneral = ({ setShowMap, coordinates, page, variant, id }) => {
  const [showLocation, setShowLocation] = useState(false);

  return (
    <div className="creation-map">
      <MapContainer
        center={coordinates || { lat: 46.3984613, lon: 33.4627281 }}
        zoom={2}
        minZoom={1}
        scrollWheelZoom={1}
        worldCopyJump
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker show={showLocation} coordinates={coordinates} />
        {page === "creation-of-checklist" ? (
          <AddMarkerToMap
            coordinates={coordinates}
            id={id}
            creation={page === "creation-of-checklist"}
          />
        ) : (
          <AddMarkerToMap
            coordinates={coordinates}
            creation={page === "creation-of-checklist"}
          />
        )}
        <CreationChecklistMapSearch id={id} />
      </MapContainer>
      <button
        onClick={() => setShowLocation([])}
        className="creation-map__location"
        type="button"
      >
        <LocationSvg />
      </button>
      {variant !== "modal" && (
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

export default MapGeneral;
