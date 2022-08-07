import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { checklistAPI } from "../../../../services/checklistService";
import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import validateEmail from "../../../../utils/validateEmail";
import "./ForgotPassword.scss";

import { ReactComponent as ExclamationSvg } from "../../../../assets/images/icon/exclamation.svg";
import { ReactComponent as EmailSvg } from "../../../../assets/images/icon/sendEmail.svg";

const ForgotPassword = () => {
  const [forgotPassword, { isSuccess, isLoading, isError, error }] =
    checklistAPI.useForgotPasswordMutation();
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [emailIsValidServer, setEmailIsValidServer] = useState(true);
  const email = useRef();
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error && error?.data?.error === "unauthorized") {
      setEmailIsValidServer(false);
    } else if (isError) {
      navigate("/error");
    }
  }, [isError]);

  const submitHandler = (e) => {
    e.preventDefault();
    const validEmail = !!validateEmail(email.current.value);
    setEmailIsValid(validEmail);
    setEmailIsValidServer(true);
    if (validEmail) {
      forgotPassword({ email: email.current.value });
    }
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password__buttons">
        <Link to="/sign-in" className="forgot-password__button active">
          {translate("login.signIn")}
        </Link>
        <Link to="/sign-up" className="forgot-password__button">
          {translate("login.signUp")}
        </Link>
      </div>
      {showOnMobile && (
        <div className="forgot-password__img">
          <EmailSvg />
        </div>
      )}
      <h1 className="forgot-password__title SFPro-600">
        {translate("login.title5")}
      </h1>
      {isSuccess && (
        <span className="forgot-password__done">{translate("login.done")}</span>
      )}
      {isLoading && <LoadingSpinner />}
      <form onSubmit={submitHandler} className="forgot-password__form">
        <label
          className={`forgot-password__label${
            !emailIsValid || !emailIsValidServer ? " invalid" : ""
          }`}
          htmlFor="loginEmail"
        >
          <span className="forgot-password__span">
            {translate("login.email")}
          </span>
          <input
            ref={email}
            id="loginEmail"
            placeholder={translate("login.emailPlaceholder")}
            type="text"
          />
          {(!emailIsValid || !emailIsValidServer) && (
            <span className="forgot-password__invalid SFPro-300">
              <ExclamationSvg />
              {!emailIsValid && translate("login.incorrectEmail")}
              {!emailIsValidServer && translate("login.emailNotFound")}
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
