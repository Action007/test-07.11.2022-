import React from "react";
import { Link } from "react-router-dom";
import "./Tabs.scss";

const Tabs = ({ tabs, category, page }) => {
  return (
    <div className="tabs">
      <div className="tabs__wrapper SFPro-600">
        {tabs.map((tab) => (
          <Link
            to={
              page === "all-checklists"
                ? `/${tab.key}-checklists?search_type=${tab.key}&page=1&per_page=10`
                : `/${tab.key}-checklists?${
                    tab.key === "active" ? "completed=false" : "completed=true"
                  }&page=1&per_page=10`
            }
            key={tab.id}
            className={`tabs__button${category === tab.key ? " active" : ""}`}
            type="button"
          >
            {tab.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
