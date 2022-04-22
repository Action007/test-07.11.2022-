import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { useDispatch } from "react-redux";
import { createChecklistActions } from "../../../store/createChecklistSlice";
// eslint-disable-next-line import/extensions
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

const CreationChecklistMapSearch = ({ id }) => {
  const map = useMap();
  const dispatch = useDispatch();

  useEffect(() => {
    let geocoder = L.Control.Geocoder.nominatim();
    // eslint-disable-next-line no-restricted-globals
    if (typeof URLSearchParams !== "undefined" && location.search) {
      // eslint-disable-next-line no-restricted-globals
      const params = new URLSearchParams(location.search);
      const geocoderString = params.get("geocoder");
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      }
    }

    L.Control.geocoder({
      query: "",
      placeholder: "Search here...",
      defaultMarkGeocode: false,
      geocoder,
    })
      .on("markgeocode", (e) => {
        const { lat, lng } = e.geocode.center;
        dispatch(
          createChecklistActions.addCoordinate({
            id,
            latLng: { lat, lon: lng },
          })
        );
        map.flyTo({ lat, lng }, map.getZoom());
      })
      .addTo(map);
  }, []);

  return null;
};

export default CreationChecklistMapSearch;
