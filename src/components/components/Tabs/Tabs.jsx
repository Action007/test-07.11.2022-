import React, { useState } from "react";
import "./Tabs.scss";

const Tabs = ({ tabs, changeHandler }) => {
  const [active, setActive] = useState(0);

  const handleClick = (id) => {
    setActive(id);
    changeHandler(id);
  };

  return (
    <div className="tabs">
      <div className="tabs__wrapper SFPro-600">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            className={`tabs__button${active === tab.id ? " active" : ""}`}
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
