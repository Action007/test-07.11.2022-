import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Breadcrumbs.scss";

import { ReactComponent as RightArrow } from "../../../assets/images/icon/right-arrow.svg";

const Breadcrumbs = ({ breadcrumbs }) => {
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
        <Link to="/">{translate("home")}</Link>
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
