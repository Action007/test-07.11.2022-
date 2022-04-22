import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import ResetPassword from "./ResetPassword/ResetPassword";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./SignInSignUp.scss";

import { ReactComponent as LoginSvg } from "../../../assets/images/content/login.svg";
import { ReactComponent as EmailSvg } from "../../../assets/images/icon/sendEmail.svg";

const PopupLogin = () => {
  const [nameIsValid, setNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const { pathname } = useLocation();

  useEffect(() => {
    setNameIsValid(true);
    setEmailIsValid(true);
    setPasswordIsValid(true);
  }, [pathname]);

  const validateEmail = (value) => {
    return String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const submitHandler = (name, email, password) => {
    const validName = name.trim() !== "";
    const validEmail = !!validateEmail(email);
    const validPassword = password.trim() !== "" && password.trim().length > 7;

    setNameIsValid(validName);
    setEmailIsValid(validEmail);
    setPasswordIsValid(validPassword);
  };

  const resetPasswordHandler = (password, passwordCopy) => {
    const isValid =
      password.trim() !== "" &&
      password === passwordCopy &&
      password.length > 7;
    setPasswordIsValid(isValid);
  };

  const sendEmailForResetPasswordHandler = (email) => {
    const validEmail = !!validateEmail(email);

    setEmailIsValid(validEmail);
  };

  return (
    <div className="sign container">
      <div className="sign__wrapper">
        {pathname === "/sign-in" && (
          <SignIn
            emailIsValid={emailIsValid}
            passwordIsValid={passwordIsValid}
            onSubmitHandler={submitHandler}
          />
        )}
        {pathname === "/sign-up" && (
          <SignUp
            nameIsValid={nameIsValid}
            emailIsValid={emailIsValid}
            passwordIsValid={passwordIsValid}
            onSubmitHandler={submitHandler}
          />
        )}
        {pathname === "/sign-in/reset-password" && (
          <ResetPassword
            passwordIsValid={passwordIsValid}
            onSubmitHandler={resetPasswordHandler}
          />
        )}
        {pathname === "/sign-in/reset" && (
          <ForgotPassword
            onSubmitHandler={sendEmailForResetPasswordHandler}
            emailIsValid={emailIsValid}
          />
        )}
        {!showOnMobile && pathname !== "/sign-in/reset" && (
          <div className="sign__img">
            <LoginSvg />
          </div>
        )}
        {!showOnMobile && pathname === "/sign-in/reset" && (
          <div className="sign__image">
            <EmailSvg />
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupLogin;
