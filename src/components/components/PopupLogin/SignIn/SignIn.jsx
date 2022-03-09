import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import "./SignIn.scss";

import { ReactComponent as ExclamationSvg } from "../../../../assets/images/icon/exclamation.svg";
import { ReactComponent as GoogleSvg } from "../../../../assets/images/icon/google.svg";

const SignIn = ({ emailIsValid, passwordIsValid, onSubmit, change }) => {
  const email = useRef();
  const password = useRef();
  const { t: translate } = useTranslation();

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit("", email.current.value, password.current.value);
  };

  return (
    <div className="sign-in">
      <div className="sign-in__buttons">
        <button className="sign-in__button active" type="button">
          {translate("login.signIn")}
        </button>
        <button
          onClick={() => change("signUp")}
          className="sign-in__button"
          type="button"
        >
          {translate("login.signUp")}
        </button>
      </div>
      <h3 className="sign-in__title SFPro-600">{translate("login.title1")}</h3>
      <form onSubmit={submitHandler} className="sign-in__form">
        <label
          className={`sign-in__label${!emailIsValid ? " invalid" : ""}`}
          htmlFor="loginEmail"
        >
          <span>Email</span>
          <input
            ref={email}
            id="loginEmail"
            placeholder={translate("login.emailPlaceholder")}
            type="text"
          />
          {!emailIsValid && (
            <span className="sign-in__invalid SFPro-300">
              <ExclamationSvg />
              {translate("login.incorrectEmail")}
            </span>
          )}
        </label>
        <label
          className={`sign-in__label${!passwordIsValid ? " invalid" : ""}`}
          htmlFor="passwordEmail"
        >
          <span>{translate("login.password")}</span>
          <input
            ref={password}
            id="passwordEmail"
            placeholder={translate("login.incorrectPassword")}
            name="password"
            autoComplete="on"
            type="password"
          />
          {!passwordIsValid && (
            <span className="sign-in__invalid SFPro-300">
              <ExclamationSvg />
              {translate("login.title1")}
            </span>
          )}
        </label>
        <button className="sign-in__submit SFPro-500" type="submit">
          {translate("login.signIn")}
        </button>
      </form>
      <span className="sign-in__span">{translate("login.or")}</span>
      <button className="sign-in__google SFPro-500" type="button">
        <GoogleSvg />
        {translate("login.google")}
      </button>
      <button
        onClick={() => change("reset")}
        className="sign-in__btn SFPro-500"
        type="button"
      >
        {translate("login.forgot")}
      </button>
    </div>
  );
};

export default SignIn;
