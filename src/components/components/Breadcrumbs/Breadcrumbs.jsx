import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumbs.scss";

import { ReactComponent as RightArrow } from "../../../assets/svg/right-arrow.svg";

const Breadcrumbs = ({ breadcrumbs }) => (
  <ul className="breadcrumbs">
    <li className="breadcrumbs__item">
      <Link to="/">Home</Link>
    </li>
    {breadcrumbs.map((breadcrumb) => (
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

export default Breadcrumbs;
