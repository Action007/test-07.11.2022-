import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./ServerError.scss";

import Error from "../../../assets/images/content/server-error.png";

const ServerError = () => {
  const { t: translate } = useTranslation();

  return (
    <div className="server-error container py-8">
      <div className="container-wrapper">
        <h2 className="server-error__title display-4 text-center SFPro-600">
          {translate("error.title")}
        </h2>
        <span className="server-error__subtitle">
          {translate("error.subtitle")}
        </span>
        <div className="server-error__img mx-auto">
          <img src={Error} alt="server error" />
        </div>
        <Link className="server-error__button SFPro-600" to="/home">
          <button className="checklist-button" type="button">
            {translate("error.button")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServerError;
