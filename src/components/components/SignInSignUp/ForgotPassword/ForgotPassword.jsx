import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import "./ForgotPassword.scss";

import { ReactComponent as ExclamationSvg } from "../../../../assets/images/icon/exclamation.svg";
import { ReactComponent as EmailSvg } from "../../../../assets/images/icon/sendEmail.svg";

const ForgotPassword = ({ emailIsValid, onSubmitHandler }) => {
  const email = useRef();
  const { t: translate } = useTranslation();
  const showOnMobile = useMediaQuery("(max-width:991px)");

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmitHandler(email.current.value);
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password__buttons">
        <button className="forgot-password__button active" type="button">
          {translate("login.signIn")}
        </button>
        <Link to="/sign-up" className="forgot-password__button">
          {translate("login.signUp")}
        </Link>
      </div>
      {showOnMobile && (
        <div className="forgot-password__img">
          <EmailSvg />
        </div>
      )}
      <h3 className="forgot-password__title SFPro-600">
        {translate("login.title5")}
      </h3>
      <span className="forgot-password__done">{translate("login.done")}</span>
      <form onSubmit={submitHandler} className="forgot-password__form">
        <label
          className={`forgot-password__label${!emailIsValid ? " invalid" : ""}`}
          htmlFor="loginEmail"
        >
          <span>{translate("login.email")}</span>
          <input
            ref={email}
            id="loginEmail"
            placeholder={translate("login.emailPlaceholder")}
            type="text"
          />
          {!emailIsValid && (
            <span className="forgot-password__invalid SFPro-300">
              <ExclamationSvg />
              {translate("login.incorrectEmail")}
            </span>
          )}
        </label>
        <button className="forgot-password__submit SFPro-500" type="submit">
          {translate("login.request")}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
