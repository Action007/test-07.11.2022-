import React, { useState } from "react";
import "./Tabs.scss";

const Tabs = ({ tabs, changeHandler }) => {
  const [active, setActive] = useState("Created");

  const handleClick = (name) => {
    setActive(name);
    changeHandler(name);
  };

  return (
    <div className="tabs">
      <div className="tabs__wrapper SFPro-600">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.name)}
            className={`tabs__button${active === tab.name ? " active" : ""}`}
            type="button"
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
