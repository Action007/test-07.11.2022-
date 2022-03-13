import React from "react";
import { useTranslation } from "react-i18next";
import "./NotFound.scss";

import { ReactComponent as Error } from "../../../assets/images/content/404.svg";

const NotFound = () => {
  const { t: translate } = useTranslation();

  return (
    <div className="container error py-8">
      <div className="container-wrapper">
        <h2 className="error__title display-4 text-center SFPro-600">
          {translate("pageNotFount.title")}
        </h2>
        <div className="error__img mx-auto">
          <Error />
        </div>
        <div className="error__button SFPro-600">
          <button type="button">{translate("pageNotFount.button")}</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
