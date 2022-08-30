import React from "react";
import { useTranslation } from "react-i18next";
import HomeButton from "../../UI/Buttons/HomeButton/HomeButton";
import "./ServerError.scss";

import Error from "../../../assets/images/content/server-error.svg";

const ServerError = () => {
  const { t: translate } = useTranslation();

  return (
    <section className="server-error container py-8">
      <div className="container-wrapper">
        <h1 className="server-error__title display-4 text-center SFPro-600">
          {translate("error.title")}
        </h1>
        <span className="server-error__subtitle">
          {translate("error.subtitle")}
        </span>
        <div className="server-error__img mx-auto">
          <img src={Error} alt="server error" />
        </div>
        <HomeButton text={translate("error.button")} />
      </div>
    </section>
  );
};

export default ServerError;
