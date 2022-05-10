import React from "react";
import { useNavigate } from "react-router-dom";
import "./Tabs.scss";

const Tabs = ({ tabs, category, setCategory, page }) => {
  const navigate = useNavigate();

  const onClickHandler = (tab) => {
    if (page === "all-checklists") {
      setCategory(tab.key);
      navigate(
        `/${tab.key}-checklists?search_type=${tab.key}&page=1&per_page=10`
      );
    } else if (page === "my-active-checklists") {
      setCategory(tab.key);
      navigate(
        `/active-checklists?${
          tab.key === "active" ? "completed=false" : "completed=true"
        }&page=1&per_page=10`
      );
    }
  };

  return (
    <div className="tabs">
      <div className="tabs__wrapper SFPro-600">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onClickHandler(tab)}
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
