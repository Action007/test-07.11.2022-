import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./Breadcrumbs.scss";

import { ReactComponent as RightArrow } from "../../../assets/images/icon/right-arrow.svg";

const Breadcrumbs = ({ breadcrumbs }) => {
  const filters = useSelector((state) => state.homePageFiltersSliceReducer.url);
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const items = breadcrumbs.map((breadcrumb) =>
    breadcrumb.title.length > 30
      ? { ...breadcrumb, title: `${breadcrumb.title.substring(0, 31)}...` }
      : breadcrumb
  );

  return (
    <ul className="breadcrumbs">
      <li className="breadcrumbs__item">
        <button onClick={() => navigate(`/${filters}`)} type="button">
          {translate("home")}
        </button>
      </li>
      {items.map((breadcrumb) => (
        <li key={breadcrumb.title} className="breadcrumbs__item">
          <RightArrow />
          {breadcrumb.link ? (
            <button onClick={() => navigate(breadcrumb.link)} type="button">
              {breadcrumb.title}
            </button>
          ) : (
            <span className="breadcrumbs__span">{breadcrumb.title}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
