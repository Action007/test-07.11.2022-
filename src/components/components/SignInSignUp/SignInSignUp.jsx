import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import ResetPassword from "./ResetPassword/ResetPassword";
import useMediaQuery from "../../../hooks/useMediaQuery";
import Notification from "../../UI/Notification/Notification";
import "./SignInSignUp.scss";

import { ReactComponent as LoginSvg } from "../../../assets/images/content/login.svg";
import { ReactComponent as EmailSvg } from "../../../assets/images/icon/sendEmail.svg";

const SignInSignUp = ({ pathname }) => {
  const [showNotification, setShowNotification] = useState(false);
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const { t: translate } = useTranslation();

  useEffect(() => {
    let notification;
    if (showNotification) {
      notification = setTimeout(() => setShowNotification(false), 6000);
    }
    return () => {
      if (notification) clearTimeout(notification);
    };
  }, [showNotification]);

  return (
    <>
      {showNotification && (
        <Notification
          translate={translate("notification.forgotPasswordUpdated")}
        />
      )}
      <section className="sign container">
        <div className="sign__wrapper">
          {pathname === "/sign-in" && <SignIn />}
          {pathname === "/sign-up" && <SignUp />}
          {pathname === "/reset_password" && (
            <ResetPassword setShowNotification={setShowNotification} />
          )}
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
      </section>
    </>
  );
};

export default SignInSignUp;
