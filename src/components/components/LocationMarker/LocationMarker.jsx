import React, { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import Leaflet from "leaflet";
import useMediaQuery from "../../../hooks/useMediaQuery";
import getAverage from "../../../utils/getAverage";

import MapImg from "../../../assets/images/icon/location.png";

const LocationMarker = ({ show, coordinates }) => {
  const [userLocation, setUserLocation] = useState(null);
  const onMobile = useMediaQuery("(max-width:991px)");
  const map = useMap();

  const myIcon = Leaflet.icon({
    iconUrl: MapImg,
    iconSize: [30, 30],
    iconAnchor: [15, 20],
  });

  const showLocationAndMarker = (latLng) => {
    const lat = getAverage([latLng.lat, coordinates.lat]);
    const lon = getAverage([latLng.lng, coordinates.lon]);
    const location = getAverage([latLng.lat, latLng.lng]);
    const coordinate = getAverage([coordinates.lat, coordinates.lon]);
    const difference = Math.abs(location - coordinate);
    let zoom;

    if (difference) zoom = 10;
    if (difference > 0.5) zoom = 5;
    if (difference > 1) zoom = 4;
    if (difference > 3) zoom = 3;
    if (difference > 10) zoom = 2;
    if (difference > 15) zoom = 1;
    if (onMobile && difference > 20) {
      map.setView(coordinates, 6);
      return;
    }
    if (difference > 40) {
      map.setView(coordinates, 8);
      return;
    }

    map.setView({ lat, lon }, zoom);
  };

  useEffect(() => {
    if (show) {
      map.locate().on("locationfound", (e) => {
        map.setView(e.latlng, 10);
      });
    }
  }, [show]);

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      if (coordinates) showLocationAndMarker(e.latlng);
      setUserLocation(e.latlng);
    });
  }, []);

  return userLocation === null ? null : (
    <Marker position={userLocation} icon={myIcon} />
  );
};

export default LocationMarker;
