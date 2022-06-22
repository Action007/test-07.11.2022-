import React from "react";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import ResetPassword from "./ResetPassword/ResetPassword";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./SignInSignUp.scss";

import { ReactComponent as LoginSvg } from "../../../assets/images/content/login.svg";
import { ReactComponent as EmailSvg } from "../../../assets/images/icon/sendEmail.svg";

const SignInSignUp = ({ pathname }) => {
  const showOnMobile = useMediaQuery("(max-width:991px)");

  return (
    <div className="sign container">
      <div className="sign__wrapper">
        {pathname === "/sign-in" && <SignIn />}
        {pathname === "/sign-up" && <SignUp />}
        {pathname === "/sign-in/reset-password" && <ResetPassword />}
        {pathname === "/sign-in/reset" && <ForgotPassword />}
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

export default SignInSignUp;
