import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import "./ResetPassword.scss";

import { ReactComponent as LoginSvg } from "../../../../assets/images/content/login.svg";
import { ReactComponent as ArrowSvg } from "../../../../assets/images/icon/rightArrow.svg";
import { ReactComponent as ExclamationSvg } from "../../../../assets/images/icon/exclamation.svg";

const ResetPassword = () => {
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const password = useRef();
  const passwordCopy = useRef();
  const { t: translate } = useTranslation();
  const showOnMobile = useMediaQuery("(max-width:991px)");

  const submitHandler = (e) => {
    e.preventDefault();

    const isValid =
      password.trim() !== "" &&
      password === passwordCopy &&
      password.length > 7;
    setPasswordIsValid(isValid);
  };

  return (
    <div className="reset-password">
      <Link to="/sign-in" className="reset-password__return">
        <ArrowSvg />
        {translate("login.back")}
      </Link>
      {showOnMobile && (
        <div className="reset-password__img">
          <LoginSvg />
        </div>
      )}
      <h2 className="reset-password__head SFPro-600">
        {translate("login.title4")}
      </h2>
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
            <span className="reset-password__invalid reset-password__invalid--last SFPro-300">
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
