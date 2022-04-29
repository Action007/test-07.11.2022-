import React from "react";
import Leaflet from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";
import { useDispatch } from "react-redux";
import { createChecklistActions } from "../../../store/createChecklistSlice";

import MapImg from "../../../assets/images/icon/map-marker.png";

const AddMarkerToMap = ({ coordinates, id, creation }) => {
  const dispatch = useDispatch();
  const myIcon = Leaflet.icon({
    iconUrl: MapImg,
    iconSize: [21, 25], // size of the icon
    iconAnchor: [10, 26], // point of the icon which will correspond to marker's location
  });

  // eslint-disable-next-line no-unused-vars
  const map = useMapEvents({
    click(e) {
      if (!creation) return;
      const { lat, lng } = e.latlng;
      map.flyTo(e.latlng, map.getZoom());
      dispatch(
        createChecklistActions.addCoordinate({ id, latLng: { lat, lon: lng } })
      );
    },
  });

  return coordinates ? <Marker position={coordinates} icon={myIcon} /> : null;
};

export default AddMarkerToMap;
