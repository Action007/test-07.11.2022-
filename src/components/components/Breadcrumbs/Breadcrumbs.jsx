import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Breadcrumbs.scss";

import { ReactComponent as RightArrow } from "../../../assets/images/icon/right-arrow.svg";

const Breadcrumbs = ({ breadcrumbs }) => {
  const { t: translate } = useTranslation();
  const items = breadcrumbs.map((breadcrumb) =>
    breadcrumb.title.length > 25
      ? { ...breadcrumb, title: `${breadcrumb.title.substring(0, 26)}...` }
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
            <Link to={breadcrumb.link}>{breadcrumb.title}</Link>
          ) : (
            <span className="breadcrumbs__span">{breadcrumb.title}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
