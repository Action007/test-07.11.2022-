import React from "react";
import Leaflet from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import uniqueID from "../../../utils/uniqueId";

import MapImg from "../../../assets/images/icon/map-marker.png";

const AddMarkerToMap = () => {
  const dispatch = useDispatch();
  const markers = useSelector((state) => state.createChecklist.markers);

  const myIcon = Leaflet.icon({
    iconUrl: MapImg,
    iconSize: [23, 30], // size of the icon
    iconAnchor: [11, 29], // point of the icon which will correspond to marker's location
  });

  // eslint-disable-next-line no-unused-vars
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      map.flyTo(e.latlng, map.getZoom());
      dispatch(createChecklistActions.addCoordinate({ lat, lng }));
    },
  });

  return (
    <>
      {markers.map((marker) => (
        <Marker key={uniqueID()} position={marker} icon={myIcon} />
      ))}
    </>
  );
};

export default AddMarkerToMap;
