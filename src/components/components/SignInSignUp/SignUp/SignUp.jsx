import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { checklistAPI } from "../../../../services/checklistService";
import LoadingSpinnerPopup from "../../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import validateEmail from "../../../../utils/validateEmail";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import "./SignUp.scss";

import { ReactComponent as LoginSvg } from "../../../../assets/images/content/login.svg";
import { ReactComponent as ExclamationSvg } from "../../../../assets/images/icon/exclamation.svg";

const SignUp = () => {
  const [nameIsValid, setNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { t: translate } = useTranslation();
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const [signUp, result] = checklistAPI.useSignUpMutation();
  // const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    const validName = name !== "";
    const validEmail = !!validateEmail(email);
    const validPassword = password !== "" && password.trim().length > 7;

    setNameIsValid(validName);
    setEmailIsValid(validEmail);
    setPasswordIsValid(validPassword);

    if (validName && validEmail && validPassword) {
      signUp({
        nickname: name,
        email,
        password,
        password_confirmation: password,
      });
    }
  };

  return (
    <>
      <div className="sign-up">
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
        <h3 className="sign-up__title SFPro-600">
          {translate("login.title2")}
        </h3>
        <form onSubmit={submitHandler} className="sign-up__form">
          <label
            className={`sign-up__label${!nameIsValid ? " invalid" : ""}`}
            htmlFor="loginName"
          >
            <span>Name</span>
            <input
              ref={nameRef}
              id="loginName"
              placeholder={translate("login.namePlaceholder")}
              type="text"
            />
            {!nameIsValid && (
              <span className="sign-up__invalid SFPro-300">
                <ExclamationSvg />
                {translate("login.incorrectName")}
              </span>
            )}
          </label>
          <label
            className={`sign-up__label${!emailIsValid ? " invalid" : ""}`}
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
              <span className="sign-up__invalid SFPro-300">
                <ExclamationSvg />
                {translate("login.incorrectEmail")}
              </span>
            )}
          </label>
          <label
            className={`sign-up__label${!passwordIsValid ? " invalid" : ""}`}
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
              <span className="sign-up__invalid SFPro-300">
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
          By signing up you agree to the{" "}
          <Link className="sign-up__link" to="/terms-of-use">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className="sign-up__link" to="/privacy-policy">
            Privacy Policy
          </Link>
        </p>
      </div>
      <LoadingSpinnerPopup showSpinner={!!result.isLoading} />
    </>
  );
};

export default SignUp;
