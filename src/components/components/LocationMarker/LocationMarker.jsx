import React, { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import Leaflet from "leaflet";

import MapImg from "../../../assets/images/icon/location.png";

const LocationMarker = ({ show }) => {
  const [location, setLocation] = useState(null);
  const map = useMap();

  const myIcon = Leaflet.icon({
    iconUrl: MapImg,
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 20], // point of the icon which will correspond to marker's location
  });

  useEffect(() => {
    if (show) {
      map.locate().on("locationfound", (e) => {
        setLocation(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }
  }, [show]);

  return location === null ? null : (
    <Marker position={location} icon={myIcon} />
  );
};

export default LocationMarker;
