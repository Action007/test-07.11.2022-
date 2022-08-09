import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../../../../store/authSlice";
import { useSignInMutation } from "../../../../services/logInService";
import LoadingSpinnerPopup from "../../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import validateEmail from "../../../../utils/validateEmail";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import "./SignIn.scss";

import { ReactComponent as LoginSvg } from "../../../../assets/images/content/login.svg";
import { ReactComponent as ExclamationSvg } from "../../../../assets/images/icon/exclamation.svg";
import { ReactComponent as GoogleSvg } from "../../../../assets/images/icon/google.svg";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

const SignIn = () => {
  const [isValidEmailServer, setIsValidEmailServer] = useState(true);
  const [isValidPasswordServer, setIsValidPasswordServer] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { t: translate } = useTranslation();
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const [signIn, { data, isSuccess, isLoading, error }] = useSignInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error?.data?.error === "not_found") {
      setIsValidEmailServer(false);
      setIsValidPasswordServer(true);
      setEmailIsValid(true);
      setPasswordIsValid(true);
      return;
    }
    if (error?.data.error === "unauthorized") {
      setIsValidPasswordServer(false);
      setIsValidEmailServer(true);
      setEmailIsValid(true);
      setPasswordIsValid(true);
      return;
    }
    if (error) {
      navigate("/error");
    }
  }, [error]);

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(authSliceActions.setToken(data.token));
    navigate("/");
  }, [isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
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
      setIsValidPasswordServer(true);
      setIsValidEmailServer(true);
    }
  };

  return (
    <>
      <div className="sign-in">
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
        <h1 className="sign-in__title SFPro-600">
          {translate("login.title1")}
        </h1>
        <form onSubmit={submitHandler} className="sign-in__form">
          <label
            className={`sign-in__label${
              !emailIsValid || !isValidEmailServer ? " invalid" : ""
            }`}
            htmlFor="loginEmail"
          >
            <span className="sign-in__span">{translate("login.email")}</span>
            <input
              ref={emailRef}
              id="loginEmail"
              placeholder={translate("login.emailPlaceholder")}
              type="email"
            />
            {(!emailIsValid || !isValidEmailServer) && (
              <span className="sign-in__invalid SFPro-300">
                <ExclamationSvg />
                {!emailIsValid && translate("login.incorrectEmail")}
                {!isValidEmailServer && translate("login.not_found")}
              </span>
            )}
          </label>
          <label
            className={`sign-in__label${
              !passwordIsValid || !isValidPasswordServer ? " invalid" : ""
            }`}
            htmlFor="loginPassword"
          >
            <span className="sign-in__span">{translate("login.password")}</span>
            <input
              ref={passwordRef}
              id="loginPassword"
              placeholder={translate("login.passwordPlaceholder")}
              name="password"
              autoComplete="on"
              type="password"
            />
            {(!passwordIsValid || !isValidPasswordServer) && (
              <span className="sign-in__invalid sign-in__invalid--last SFPro-300">
                <ExclamationSvg />
                {!passwordIsValid && translate("login.title1")}
                {!isValidPasswordServer && translate("login.unauthorized")}
              </span>
            )}
          </label>
          <button className="sign-in__submit SFPro-500" type="submit">
            {translate("login.signIn")}
          </button>
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
      </div>
      <LoadingSpinnerPopup showSpinner={!!isLoading} />
    </>
  );
};

export default SignIn;
