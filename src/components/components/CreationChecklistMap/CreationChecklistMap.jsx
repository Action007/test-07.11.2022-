import React, { useState } from "react";
import GeneralMap from "../GeneralMap/GeneralMap";
import PopupMap from "../PopupMap/PopupMap";

const CreationChecklistMap = () => {
  const [showMap, setShowMap] = useState(false);
  // const [showResult, SetShowResult] = useState(false);

  return (
    <>
      <GeneralMap setShowMap={setShowMap} />
      <PopupMap show={showMap} onHide={() => setShowMap(false)} />
    </>
  );
};

export default CreationChecklistMap;
