import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import ResetPassword from "./ResetPassword/ResetPassword";
import "./PopupLogin.scss";

import { ReactComponent as LoginSvg } from "../../../assets/images/icon/login.svg";

const PopupLogin = ({ show, onHide }) => {
  const [nameIsValid, setNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [state, setState] = useState("signIn");

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
    <Modal
      className="popup-login"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" />
      </Modal.Header>
      <Modal.Body className="popup-login__wrapper">
        {state === "signIn" && (
          <SignIn
            emailIsValid={emailIsValid}
            passwordIsValid={passwordIsValid}
            onSubmit={submitHandler}
            change={setState}
          />
        )}
        {state === "signUp" && (
          <SignUp
            nameIsValid={nameIsValid}
            emailIsValid={emailIsValid}
            passwordIsValid={passwordIsValid}
            onSubmit={submitHandler}
            change={setState}
          />
        )}
        {state === "reset" && (
          <ResetPassword
            passwordIsValid={passwordIsValid}
            onSubmit={resetHandler}
            change={setState}
          />
        )}
        <div className="popup-login__img">
          <LoginSvg />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupLogin;
