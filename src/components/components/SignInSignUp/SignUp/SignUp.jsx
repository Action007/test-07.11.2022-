import React, { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LoadingSpinnerPopup from "../../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import validateEmail from "../../../../utils/validateEmail";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import "./SignUp.scss";

import { ReactComponent as LoginSvg } from "../../../../assets/images/content/login.svg";
import { ReactComponent as ExclamationSvg } from "../../../../assets/images/icon/exclamation.svg";
import { useSignUpMutation } from "../../../../services/logInService";

const SignUp = () => {
  const [isValidNicknameServer, setIsValidNicknameServer] = useState(true);
  const [isValidEmailServer, setIsValidEmailServer] = useState(true);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [signUp, { isLoading, isSuccess, error }] = useSignUpMutation();
  const emailValue = emailRef.current?.value;
  const { t: translate } = useTranslation();
  const showOnMobile = useMediaQuery("(max-width:991px)");

  useEffect(() => {
    if (!error?.data.message) return;
    setIsValidNicknameServer(true);
    setIsValidEmailServer(true);
    error.data.message.forEach((item) => {
      if (item.attribute === "nickname" && item.type === "taken") {
        setIsValidNicknameServer(false);
      } else if (item.attribute === "email" && item.type === "taken") {
        setIsValidEmailServer(false);
      }
    });
    setEmailIsValid(true);
    setPasswordIsValid(true);
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const validName = name !== "";
    const validEmail = !!validateEmail(email);
    const validPassword = password !== "" && password.length > 7;

    if (validName && validEmail && validPassword) {
      signUp({
        nickname: name,
        email,
        password,
        password_confirmation: password,
      });
    } else {
      setNameIsValid(validName);
      setEmailIsValid(validEmail);
      setPasswordIsValid(validPassword);
      if (!validEmail) setIsValidEmailServer(true);
      if (!validName) setIsValidNicknameServer(true);
    }
  };

  const showSignUp = (
    <>
      <div className="sign-up__buttons">
        <Link to="/sign-in" className="sign-up__button">
          {translate("login.signIn")}
        </Link>
        <button className="sign-up__button active" type="button">
          {translate("login.signUp")}
        </button>
      </div>
      {showOnMobile && (
        <div className="sign-up__img">
          <LoginSvg />
        </div>
      )}
      <h1 className="sign-up__title SFPro-600">{translate("login.title2")}</h1>
      <form onSubmit={submitHandler} className="sign-up__form">
        <label
          className={`sign-up__label${
            !nameIsValid || !isValidNicknameServer ? " invalid" : ""
          }`}
          htmlFor="loginName"
        >
          <span className="sign-up__span">{translate("login.nickname")}</span>
          <input
            ref={nameRef}
            id="loginName"
            placeholder={translate("login.nicknamePlaceholder")}
            minLength="2"
            type="text"
          />
          {(!nameIsValid || !isValidNicknameServer) && (
            <span className="sign-up__invalid SFPro-300">
              <ExclamationSvg />
              {!nameIsValid && translate("login.incorrectNickname")}
              {!isValidNicknameServer && translate("login.nickNameTaken")}
            </span>
          )}
        </label>
        <label
          className={`sign-up__label${
            !emailIsValid || !isValidEmailServer ? " invalid" : ""
          }`}
          htmlFor="loginEmail"
        >
          <span className="sign-up__span">{translate("login.email")}</span>
          <input
            ref={emailRef}
            id="loginEmail"
            placeholder={translate("login.emailPlaceholder")}
            type="email"
          />
          {(!emailIsValid || !isValidEmailServer) && (
            <span className="sign-up__invalid SFPro-300">
              <ExclamationSvg />
              {!emailIsValid && translate("login.incorrectEmail")}
              {!isValidEmailServer && translate("login.emailTaken")}
            </span>
          )}
        </label>
        <label
          className={`sign-up__label${!passwordIsValid ? " invalid" : ""}`}
          htmlFor="passwordEmail"
        >
          <span className="sign-up__span">{translate("login.password")}</span>
          <input
            ref={passwordRef}
            id="passwordEmail"
            placeholder={translate("login.passwordPlaceholder")}
            name="password"
            autoComplete="on"
            type="password"
            minLength="8"
          />
          {!passwordIsValid && (
            <span className="sign-up__invalid sign-up__invalid--last SFPro-300">
              <ExclamationSvg />
              {translate("login.title1")}
            </span>
          )}
        </label>
        <button className="sign-up__submit SFPro-500" type="submit">
          {translate("login.signUp")}
        </button>
      </form>
      <p className="sign-up__desc SFPro-300">
        <Trans
          i18nKey="login.signInDesc"
          t={translate}
          components={[
            <Link className="sign-up__link" to="/terms-of-use" />,
            <Link className="sign-up__link" to="/privacy-policy" />,
          ]}
        />
      </p>
    </>
  );

  const showDone = (
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
        onClick={() => window.open(`mailto:${emailValue}`)}
        className="sign-up__btn SFPro-500"
        type="button"
      >
        {translate("login.openEmail")}
      </button>
    </div>
  );

  return (
    <>
      <div className="sign-up">{!isSuccess ? showSignUp : showDone}</div>
      <LoadingSpinnerPopup showSpinner={!!isLoading} />
    </>
  );
};

export default SignUp;
