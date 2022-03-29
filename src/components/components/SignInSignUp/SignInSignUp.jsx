import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import ResetPassword from "./ResetPassword/ResetPassword";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./SignInSignUp.scss";

import { ReactComponent as LoginSvg } from "../../../assets/images/content/login.svg";

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

  const resetHandler = (password, passwordCopy) => {
    const isValid =
      password.trim() !== "" &&
      password === passwordCopy &&
      password.length > 7;
    setPasswordIsValid(isValid);
  };

  return (
    <div className="sign container">
      <div className="sign__wrapper">
        {pathname === "/sign-in" && (
          <SignIn
            emailIsValid={emailIsValid}
            passwordIsValid={passwordIsValid}
            onSubmit={submitHandler}
          />
        )}
        {pathname === "/sign-up" && (
          <SignUp
            nameIsValid={nameIsValid}
            emailIsValid={emailIsValid}
            passwordIsValid={passwordIsValid}
            onSubmit={submitHandler}
          />
        )}
        {pathname === "/sign-in/reset" && (
          <ResetPassword
            passwordIsValid={passwordIsValid}
            onSubmit={resetHandler}
          />
        )}
        {!showOnMobile && (
          <div className="sign__img">
            <LoginSvg />
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupLogin;