import React, { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinnerPopup from "../../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import isServerError from "../../../../utils/isServerError";
import validateEmail from "../../../../utils/validateEmail";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import "./SignUp.scss";

import { ReactComponent as LoginSvg } from "../../../../assets/images/content/login.svg";
import { ReactComponent as ExclamationSvg } from "../../../../assets/images/icon/exclamation.svg";
import { useSignUpMutation } from "../../../../services/logInService";
import CheckYourEmail from "../CheckYourEmail/CheckYourEmail";

const SignUp = () => {
  const [isValidNicknameServer, setIsValidNicknameServer] = useState(true);
  const [isNicknameTooLong, setIsNicknameTooLong] = useState(false);
  const [isNicknameInvalidCharacters, setIsNicknameInvalidCharacters] =
    useState(false);
  const [isValidEmailServer, setIsValidEmailServer] = useState(true);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [isPasswordTooLong, setIsPasswordTooLong] = useState(false);
  const nickNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [signUp, { isLoading, isSuccess, error }] = useSignUpMutation();
  const emailValue = emailRef.current?.value;
  const { t: translate } = useTranslation();
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const navigate = useNavigate();

  useEffect(() => {
    if (isServerError(error?.status)) {
      navigate("/error", { replace: true });
      return;
    }
    if (!error?.data?.message) return;

    const { message } = error.data;

    if (message[0].attribute === "nickname" && message[0].type === "taken") {
      setIsValidNicknameServer(false);
    } else if (
      message[0].attribute === "email" &&
      message[0].type === "taken"
    ) {
      setIsValidEmailServer(false);
    } else if (
      message[0].attribute === "nickname" &&
      message[0].type === "invalid_characters"
    ) {
      setIsNicknameInvalidCharacters(true);
    }
    if (error?.data?.error === "retry_later") {
      navigate("/too-many-request");
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    const nickName = nickNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const isValidNickname = nickName !== "";
    const isNicknameNotLong = nickName.length < 50;
    const isValidEmail = !!validateEmail(email);
    const isValidPasswordMin = password.length > 7;
    const isValidPasswordMax = password.length < 73;

    setIsNicknameValid(true);
    setIsValidNicknameServer(true);
    setIsValidEmailServer(true);
    setEmailIsValid(true);
    setPasswordIsValid(true);
    setIsNicknameTooLong(false);
    setIsNicknameInvalidCharacters(false);
    setIsPasswordTooLong(false);

    if (
      isValidNickname &&
      isValidEmail &&
      isValidPasswordMin &&
      isValidPasswordMax &&
      isNicknameNotLong
    ) {
      signUp({
        nickname: nickName,
        email,
        password,
        password_confirmation: password,
      });
    } else {
      setIsNicknameValid(isValidNickname);
      setEmailIsValid(isValidEmail);
      setPasswordIsValid(isValidPasswordMin);
      setIsNicknameTooLong(!isNicknameNotLong);
      setIsPasswordTooLong(!isValidPasswordMax);
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
            !isNicknameValid ||
            !isValidNicknameServer ||
            isNicknameTooLong ||
            isNicknameInvalidCharacters
              ? " invalid"
              : ""
          }`}
          htmlFor="loginName"
        >
          <span className="sign-up__span">{translate("login.nickname")}</span>
          <input
            ref={nickNameRef}
            id="loginName"
            placeholder={translate("login.nicknamePlaceholder")}
            minLength="2"
            type="text"
          />
          {(!isNicknameValid ||
            !isValidNicknameServer ||
            isNicknameTooLong ||
            isNicknameInvalidCharacters) && (
            <span className="sign-up__invalid SFPro-300">
              <ExclamationSvg />
              {!isNicknameValid && translate("login.incorrectNickname")}
              {!isValidNicknameServer && translate("login.nicknameTaken")}
              {isNicknameValid &&
                isNicknameTooLong &&
                translate("login.nicknameTooLong")}
              {isNicknameInvalidCharacters &&
                translate("login.nicknameInvalidCharacters")}
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
          className={`sign-up__label${
            !passwordIsValid || isPasswordTooLong ? " invalid" : ""
          }`}
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
          {(!passwordIsValid || isPasswordTooLong) && (
            <span className="sign-up__invalid sign-up__invalid--last SFPro-300">
              <ExclamationSvg />
              {!passwordIsValid && translate("login.title1")}
              {isPasswordTooLong && translate("login.maxPassword")}
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

  return (
    <>
      <LoadingSpinnerPopup showSpinner={!!isLoading} />
      <div className="sign-up">
        {isSuccess && emailValue ? (
          <CheckYourEmail showOnMobile={showOnMobile} emailValue={emailValue} />
        ) : (
          showSignUp
        )}
      </div>
    </>
  );
};

export default SignUp;
