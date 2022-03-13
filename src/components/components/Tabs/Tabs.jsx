import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Tabs.scss";

const Tabs = ({ tabs, changeHandler, category }) => {
  const [key, setKey] = useState(category);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/saved-checklists") setKey("saved");
    if (pathname === "/all-checklists") setKey("created");
  }, [pathname]);

  // eslint-disable-next-line no-shadow
  const handleClick = (key) => {
    setKey(key);
    changeHandler(key);
  };

  return (
    <div className="tabs">
      <div className="tabs__wrapper SFPro-600">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.key)}
            className={`tabs__button${key === tab.key ? " active" : ""}`}
            type="button"
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
