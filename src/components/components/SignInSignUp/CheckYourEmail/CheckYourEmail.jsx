import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as LoginSvg } from "../../../../assets/images/content/login.svg";

const CheckYourEmail = ({ showOnMobile, emailValue }) => {
  const { t: translate } = useTranslation();
  const emailValid = emailValue.split("@");

  return (
    <div className="sign-up__inner">
      <h2 className="sign-up__heading SFPro-600">
        {translate("login.title3")}
      </h2>
      {showOnMobile && (
        <div className="sign-up__img">
          <LoginSvg />
        </div>
      )}
      <p className="sign-up__subtitle">{translate("login.desc")}</p>
      <button
        onClick={() => window.open(`https://${emailValid[1]}`)}
        className="sign-up__btn SFPro-500"
        type="button"
      >
        {translate("login.openEmail")}
      </button>
    </div>
  );
};

export default CheckYourEmail;
