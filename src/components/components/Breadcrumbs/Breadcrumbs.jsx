import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./Breadcrumbs.scss";

import { ReactComponent as RightArrow } from "../../../assets/images/icon/right-arrow.svg";

const Breadcrumbs = ({ breadcrumbs }) => {
  const filters = useSelector((state) => state.homePageFiltersSliceReducer.url);
  const { t: translate } = useTranslation();
  const items = breadcrumbs.map((breadcrumb) =>
    breadcrumb.title.length > 35
      ? { ...breadcrumb, title: `${breadcrumb.title.substring(0, 36)}...` }
      : breadcrumb
  );

  return (
    <div className="breadcrumbs">
      <ul className="breadcrumbs__items">
        <li className="breadcrumbs__item">
          <Link to={`/${filters}`} type="button">
            {translate("home")}
          </Link>
        </li>
        {items.map((breadcrumb) => (
          <li key={breadcrumb.title} className="breadcrumbs__item">
            <RightArrow />
            {breadcrumb.link ? (
              <Link to={breadcrumb.link} type="button">
                {breadcrumb.title}
              </Link>
            ) : (
              <span className="breadcrumbs__span">{breadcrumb.title}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
