import React from "react";
import { useTranslation } from "react-i18next";
import HomeButton from "../../UI/Buttons/HomeButton/HomeButton";
import "./TooManyRequest.scss";

import { ReactComponent as Error } from "../../../assets/images/content/too-many-requests.svg";

const TooManyRequest = () => {
  const { t: translate } = useTranslation();

  return (
    <section className="many-request container py-8">
      <div className="container-wrapper">
        <h1 className="many-request__title display-4 text-center SFPro-600">
          {translate("tooManyRequest.title")}
        </h1>
        <div className="many-request__img mx-auto">
          <Error />
        </div>
        <div className="text-center">
          <HomeButton text={translate("tooManyRequest.button")} />
        </div>
      </div>
    </section>
  );
};

export default TooManyRequest;
