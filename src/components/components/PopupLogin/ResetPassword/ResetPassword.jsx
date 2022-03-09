import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import "./ResetPassword.scss";

import { ReactComponent as ArrowSvg } from "../../../../assets/images/icon/rightArrow.svg";
import { ReactComponent as ExclamationSvg } from "../../../../assets/images/icon/exclamation.svg";

const ResetPassword = ({ passwordIsValid, onSubmit, change }) => {
  const password = useRef();
  const passwordCopy = useRef();
  const { t: translate } = useTranslation();

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(password.current.value, passwordCopy.current.value);
  };

  return (
    <div className="reset-password">
      <button
        onClick={() => change("signIn")}
        className="reset-password__return"
        type="button"
      >
        <ArrowSvg />
        {translate("login.back")}
      </button>
      <h3 className="reset-password__head SFPro-600">
        {translate("login.title4")}
      </h3>
      <form onSubmit={(e) => submitHandler(e)} className="reset-password__form">
        <label
          className={`reset-password__label${
            !passwordIsValid ? " invalid" : ""
          }`}
          htmlFor="passwordEmail"
        >
          <span>{translate("login.newPassword")}</span>
          <input
            ref={password}
            id="passwordEmail"
            placeholder={translate("login.enterPassword")}
            name="password"
            autoComplete="on"
            type="password"
          />
          {!passwordIsValid && (
            <span className="reset-password__invalid SFPro-300">
              <ExclamationSvg />
              {translate("login.incorrectPassword")}
            </span>
          )}
        </label>
        <label
          className={`reset-password__label${
            !passwordIsValid ? " invalid" : ""
          }`}
          htmlFor="passwordEmail"
        >
          <span>{translate("login.confirmPassword")}</span>
          <input
            ref={passwordCopy}
            id="passwordEmail"
            placeholder={translate("login.enterAPassword")}
            name="password"
            autoComplete="on"
            type="password"
          />
          {!passwordIsValid && (
            <span className="reset-password__invalid SFPro-300">
              <ExclamationSvg />
              {translate("login.incorrectPassword")}
            </span>
          )}
        </label>
        <button className="reset-password__submit SFPro-500" type="submit">
          {translate("login.title4")}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
