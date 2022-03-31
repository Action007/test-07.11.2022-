import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Tabs.scss";

const Tabs = ({ tabs, changeHandler, category }) => {
  const [key, setKey] = useState(category);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/saved-checklists") {
      setKey("saved");
      changeHandler("saved");
    }
    if (pathname === "/liked-checklists") {
      setKey("liked");
      changeHandler("liked");
    }
    if (pathname === "/created-checklists") {
      setKey("created");
      changeHandler("created");
    }
  }, [pathname]);

  return (
    <div className="tabs">
      <div className="tabs__wrapper SFPro-600">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => navigate(`/${tab.key}-checklists`)}
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
