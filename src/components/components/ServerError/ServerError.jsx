import React from "react";
import { useTranslation } from "react-i18next";
import HomeButton from "../../UI/Buttons/HomeButton/HomeButton";
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
        <HomeButton />
      </div>
    </div>
  );
};

export default ServerError;
