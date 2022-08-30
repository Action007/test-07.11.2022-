import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useResetForgotPasswordMutation } from "../../../../services/logInService";
import LoadingSpinnerPopup from "../../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import isServerError from "../../../../utils/isServerError";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import "./ResetPassword.scss";

import { ReactComponent as LoginSvg } from "../../../../assets/images/content/login.svg";
import { ReactComponent as ArrowSvg } from "../../../../assets/images/icon/rightArrow.svg";
import { ReactComponent as ExclamationSvg } from "../../../../assets/images/icon/exclamation.svg";

const ResetPassword = ({ setShowNotification }) => {
  const [resetPassword, { isLoading, isSuccess, error }] =
    useResetForgotPasswordMutation();
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isPasswordTooLong, setIsPasswordTooLong] = useState(false);
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const newPassword = useRef();
  const passwordConfirm = useRef();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("reset_password_token");
  const { t: translate } = useTranslation();

  useEffect(() => {
    if (!token) navigate("/not-found", { replace: true });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setShowNotification(true);
      navigate("/sign-in");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isServerError(error?.status)) {
      navigate("/error", { replace: true });
    }
    if (error?.data?.error === "retry_later") {
      navigate("/too-many-request");
    }
  }, [error]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newPasswordValue = newPassword.current.value;
    const passwordConfirmValue = passwordConfirm.current.value;
    const isValidPasswordMin = newPassword.current.value.length > 7;
    const isValidPasswordMax = newPassword.current.value.length < 73;
    const isPasswordsMatch = newPasswordValue === passwordConfirmValue;

    setIsNewPasswordValid(true);
    setIsConfirmPasswordValid(true);

    if (isValidPasswordMin && isValidPasswordMax && isPasswordsMatch) {
      resetPassword({
        reset_password_token: token,
        new_password: newPasswordValue,
        new_password_confirmation: passwordConfirmValue,
      });

      newPassword.current.value = "";
      passwordConfirm.current.value = "";
      return;
    }

    setIsNewPasswordValid(isValidPasswordMin);
    setIsPasswordTooLong(!isValidPasswordMax);
    setIsConfirmPasswordValid(isPasswordsMatch);
  };

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isLoading} />
      <div className="reset-password">
        <Link to="/sign-in" className="reset-password__return">
          <ArrowSvg />
          {translate("login.back")}
        </Link>
        {showOnMobile && (
          <div className="reset-password__img">
            <LoginSvg />
          </div>
        )}
        <h1 className="reset-password__head SFPro-600">
          {translate("login.title4")}
        </h1>
        <form onSubmit={onSubmitHandler} className="reset-password__form">
          <label
            className={`reset-password__label${
              !isNewPasswordValid || isPasswordTooLong ? " invalid" : ""
            }`}
            htmlFor="newPassword"
          >
            <span>{translate("login.newPassword")}</span>
            <input
              ref={newPassword}
              id="newPassword"
              placeholder={translate("login.enterPassword")}
              name="password"
              autoComplete="on"
              type="password"
            />
            {(!isNewPasswordValid || isPasswordTooLong) && (
              <span className="reset-password__invalid SFPro-300">
                <ExclamationSvg />
                {!isNewPasswordValid && translate("login.minimum")}
                {isPasswordTooLong && translate("login.maxPassword")}
              </span>
            )}
          </label>
          <label
            className={`reset-password__label${
              !isConfirmPasswordValid ? " invalid" : ""
            }`}
            htmlFor="confirmPassword"
          >
            <span>{translate("login.confirmPassword")}</span>
            <input
              ref={passwordConfirm}
              id="confirmPassword"
              placeholder={translate("login.enterAPassword")}
              name="password"
              autoComplete="on"
              type="password"
            />
            {!isConfirmPasswordValid && (
              <span className="reset-password__invalid reset-password__invalid--last SFPro-300">
                <ExclamationSvg />
                {translate("login.doesNotMatch")}
              </span>
            )}
          </label>
          <button className="reset-password__submit SFPro-500" type="submit">
            {translate("login.title4")}
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
