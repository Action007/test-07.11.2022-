import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../../../../store/authSlice";
import {
  useResendConfirmAccountMutation,
  useSignInMutation,
} from "../../../../services/logInService";
import LoadingSpinnerPopup from "../../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import validateEmail from "../../../../utils/validateEmail";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import isServerError from "../../../../utils/isServerError";
import "./SignIn.scss";

import { ReactComponent as LoginSvg } from "../../../../assets/images/content/login.svg";
import { ReactComponent as ExclamationSvg } from "../../../../assets/images/icon/exclamation.svg";
import { ReactComponent as GoogleSvg } from "../../../../assets/images/icon/google.svg";
import CheckYourEmail from "../CheckYourEmail/CheckYourEmail";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

const SignIn = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [isValidEmailOrPassword, setIsValidEmailOrPassword] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const emailRef = useRef();
  const emailValue = emailRef.current?.value;
  const passwordRef = useRef();
  const { t: translate } = useTranslation();
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const [
    resendConfirmation,
    {
      isLoading: isLoadingResend,
      isSuccess: isResendSuccess,
      error: resendConfirmationError,
    },
  ] = useResendConfirmAccountMutation();
  const [
    signIn,
    { data, isSuccess: isSignInSuccess, isLoading: isLoadingSignIn, error },
  ] = useSignInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) return;

    if (error.data?.error === "unauthorized") {
      setIsValidEmailOrPassword(false);
      return;
    }
    if (
      error.data?.message &&
      error.data?.message[0].attribute === "confirmed" &&
      error.data?.message[0].type === "invalid"
    ) {
      setIsEmailVerified(false);
      return;
    }
    if (error?.data?.error === "retry_later") {
      navigate("/too-many-request");
    }
    if (isServerError(error?.status)) {
      navigate("/error", { replace: true });
    }
  }, [error]);

  useEffect(() => {
    if (!resendConfirmationError) return;

    if (error?.data?.error === "retry_later") {
      navigate("/too-many-request");
    }
  }, [resendConfirmationError]);

  useEffect(() => {
    if (!isSignInSuccess) return;
    dispatch(authSliceActions.setToken(data.token));
    navigate("/");
  }, [isSignInSuccess]);

  const resendConfirmHandler = () => {
    resendConfirmation({ email: emailRef.current.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setIsValidEmailOrPassword(true);
    setIsEmailVerified(true);
    setEmailIsValid(true);
    setPasswordIsValid(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const validEmail = !!validateEmail(email);
    const validPassword = password !== "" && password.length > 7;

    if (validEmail && validPassword) {
      signIn({
        email,
        password,
      });
    } else {
      setEmailIsValid(validEmail);
      setPasswordIsValid(validPassword);
    }
  };

  const showSignIn = (
    <>
      <div className="sign-in__buttons">
        <button className="sign-in__button active" type="button">
          {translate("login.signIn")}
        </button>
        <Link to="/sign-up" className="sign-in__button">
          {translate("login.signUp")}
        </Link>
      </div>
      {showOnMobile && (
        <div className="sign-in__img">
          <LoginSvg />
        </div>
      )}
      <h1 className="sign-in__title SFPro-600">{translate("login.title1")}</h1>
      <form onSubmit={submitHandler} className="sign-in__form">
        <label
          className={`sign-in__label${
            !emailIsValid || !isEmailVerified || !isValidEmailOrPassword
              ? " invalid"
              : ""
          }`}
          htmlFor="loginEmail"
        >
          <span className="sign-in__span">{translate("login.email")}</span>
          <input
            disabled={!isEmailVerified}
            ref={emailRef}
            id="loginEmail"
            placeholder={translate("login.emailPlaceholder")}
            type="email"
          />
          {(!emailIsValid || !isEmailVerified || !isValidEmailOrPassword) && (
            <span className="sign-in__invalid SFPro-300">
              <ExclamationSvg />
              {!emailIsValid && translate("login.incorrectEmail")}
              {!isEmailVerified && translate("login.emailNotVerified")}
              {!isValidEmailOrPassword &&
                translate("login.invalidEmailOrPassword")}
            </span>
          )}
        </label>
        {isEmailVerified ? (
          <>
            <label
              className={`sign-in__label${!passwordIsValid ? " invalid" : ""}`}
              htmlFor="loginPassword"
            >
              <span className="sign-in__span">
                {translate("login.password")}
              </span>
              <input
                ref={passwordRef}
                id="loginPassword"
                placeholder={translate("login.passwordPlaceholder")}
                name="password"
                autoComplete="on"
                type="password"
              />
              {!passwordIsValid && (
                <span className="sign-in__invalid sign-in__invalid--last SFPro-300">
                  <ExclamationSvg />
                  {!passwordIsValid && translate("login.title1")}
                </span>
              )}
            </label>
            <button className="sign-in__submit SFPro-500" type="submit">
              {translate("login.signIn")}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={resendConfirmHandler}
              className="sign-in__submit sign-in__submit--margin SFPro-500"
              type="button"
            >
              {translate("login.resendConfirmation")}
            </button>
            <button
              onClick={() => setIsEmailVerified(true)}
              className="sign-in__google SFPro-500"
              type="button"
            >
              {translate("login.back")}
            </button>
          </>
        )}
      </form>
      <span className="sign-in__absolute">{translate("login.or")}</span>
      <a
        className="sign-in__google SFPro-500"
        href={`${HOSTNAME}/api/auth/google`}
      >
        <GoogleSvg />
        {translate("login.google")}
      </a>
      <Link to="reset" className="sign-in__btn">
        {translate("login.forgot")}
      </Link>
    </>
  );

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isLoadingSignIn || isLoadingResend} />
      <div className="sign-in">
        {isResendSuccess && emailValue ? (
          <CheckYourEmail showOnMobile={showOnMobile} emailValue={emailValue} />
        ) : (
          showSignIn
        )}
      </div>
    </>
  );
};

export default SignIn;
