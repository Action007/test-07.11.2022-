import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Tabs.scss";

const Tabs = ({ tabs, changeHandler, category }) => {
  const [key, setKey] = useState(category);
  const { pathname } = useLocation();

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
          <Link
            to={`/${tab.key}-checklists`}
            key={tab.id}
            className={`tabs__button${key === tab.key ? " active" : ""}`}
          >
            {tab.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
