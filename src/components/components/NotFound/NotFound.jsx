import React from "react";
import { useTranslation } from "react-i18next";
import HomeButton from "../../UI/Buttons/HomeButton/HomeButton";
import "./NotFound.scss";

import { ReactComponent as Error } from "../../../assets/images/content/404.svg";

const NotFound = () => {
  const { t: translate } = useTranslation();

  return (
    <section className="not-found container py-8">
      <div className="container-wrapper">
        <h1 className="not-found__title display-4 text-center SFPro-600">
          {translate("error.notFound")}
        </h1>
        <div className="not-found__img mx-auto">
          <Error />
        </div>
        <div className="text-center">
          <HomeButton text={translate("error.button")} />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
