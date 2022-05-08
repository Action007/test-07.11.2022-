import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checklistAPI } from "../../../../services/checklistService";
import LoadingSpinnerPopup from "../../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import validateEmail from "../../../../utils/validateEmail";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import "./SignIn.scss";

import { ReactComponent as LoginSvg } from "../../../../assets/images/content/login.svg";
import { ReactComponent as ExclamationSvg } from "../../../../assets/images/icon/exclamation.svg";
import { ReactComponent as GoogleSvg } from "../../../../assets/images/icon/google.svg";
import { authSliceActions } from "../../../../store/authSlice";

const SignIn = () => {
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { t: translate } = useTranslation();
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const [signIn, result] = checklistAPI.useSignInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!result.isSuccess) return;
    dispatch(authSliceActions.setToken(result.data.token));
    navigate("/");
  }, [result]);

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const validEmail = !!validateEmail(email);
    const validPassword = password !== "" && password.length > 7;

    setEmailIsValid(validEmail);
    setPasswordIsValid(validPassword);

    if (validEmail && validPassword) {
      signIn({
        email,
        password,
      });
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
        <h3 className="sign-in__title SFPro-600">
          {translate("login.title1")}
        </h3>
        <form onSubmit={submitHandler} className="sign-in__form">
          <label
            className={`sign-in__label${!emailIsValid ? " invalid" : ""}`}
            htmlFor="loginEmail"
          >
            <span>{translate("login.email")}</span>
            <input
              ref={emailRef}
              id="loginEmail"
              placeholder={translate("login.emailPlaceholder")}
              type="email"
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
              ref={passwordRef}
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
        <Link to="reset" className="sign-in__btn">
          {translate("login.forgot")}
        </Link>
      </div>
      <LoadingSpinnerPopup showSpinner={!!result.isLoading} />
    </>
  );
};

export default SignIn;
