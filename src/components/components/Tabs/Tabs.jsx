import React from "react";
import { useNavigate } from "react-router-dom";
import "./Tabs.scss";

const Tabs = ({ tabs, category }) => {
  const navigate = useNavigate();

  return (
    <div className="tabs">
      <div className="tabs__wrapper SFPro-600">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => navigate(`/${tab.key}-checklists`)}
            className={`tabs__button${category === tab.key ? " active" : ""}`}
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
