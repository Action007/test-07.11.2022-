import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { checklistAPI } from "../../../services/checklistService";
import validateEmail from "../../../utils/validateEmail";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import "./AccountSetting.scss";

import { ReactComponent as EditProfileSvg } from "../../../assets/images/content/account-settings.svg";

const AccountSetting = () => {
  const [resetPassword, { isLoading, isError, error }] =
    checklistAPI.useResetPasswordMutation();
  const user = useSelector((state) => state.authSliceReducer.user);
  const [emilValue, setEmailValue] = useState("@");
  const confirmPasswordRef = useRef();
  const [emailValid, setEmailValid] = useState(true);
  const [oldPasswordValid, setOldPasswordValid] = useState(true);
  const [oldPasswordIncorrect, setOldPasswordIncorrect] = useState(true);
  const [newPasswordValid, setNewPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const breadcrumbs = [
    { title: translate("profilePage.myProfile"), link: "/my-profile" },
    { title: translate("accountSettings.title") },
  ];

  useEffect(() => {
    if (!error) return;

    const message = error.data?.message[0];
    if (message?.attribute === "old_password" && message?.type === "invalid") {
      setOldPasswordIncorrect(false);
    } else {
      navigate("/error");
    }
  }, [isError]);

  useEffect(() => {
    if (user) setEmailValue(user.email);
  }, [user]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const email = validateEmail(emilValue);
    const oldPassword = oldPasswordRef.current.value.trim().length > 0;
    const newPassword = newPasswordRef.current.value.trim().length > 7;
    const confirmPassword =
      confirmPasswordRef.current.value === newPasswordRef.current.value;

    setEmailValid(!!email);
    setOldPasswordValid(oldPassword);
    setNewPasswordValid(newPassword);
    setConfirmPasswordValid(confirmPassword);
    setOldPasswordIncorrect(true);

    if (email && oldPassword && newPassword && confirmPassword) {
      resetPassword({
        old_password: oldPasswordRef.current.value,
        new_password: newPasswordRef.current.value,
        new_password_confirmation: confirmPasswordRef.current.value,
      });
    }
  };

  return (
    <>
      <div className="account-setting container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="account-setting__wrapper">
          <form
            onSubmit={(e) => onSubmitHandler(e)}
            className="account-setting__form"
          >
            <label
              className={`account-setting__label${
                !emailValid ? " invalid" : ""
              }`}
              htmlFor="account-email"
            >
              <span className="account-setting__title account-setting__title--one SFPro-700">
                {translate("accountSettings.email")}
              </span>
              <input
                onChange={(e) => {
                  setEmailValid(true);
                  setEmailValue(e.target.value);
                }}
                value={emilValue}
                type="email"
                id="account-email"
                disabled
              />
            </label>
            <label
              className={`account-setting__label${
                !oldPasswordValid || !oldPasswordIncorrect ? " invalid" : ""
              }`}
              htmlFor="account-oldPassword"
            >
              <span className="account-setting__title account-setting__title--two SFPro-700">
                {translate("accountSettings.oldPassword")}
              </span>
              {!oldPasswordIncorrect && (
                <span className="account-setting__subtitle">
                  {translate("accountSettings.incorrect")}
                </span>
              )}
              <input
                onChange={() => setOldPasswordValid(true)}
                ref={oldPasswordRef}
                type="password"
                id="account-oldPassword"
                autoComplete="on"
              />
            </label>
            <label
              className={`account-setting__label${
                !newPasswordValid ? " invalid" : ""
              }`}
              htmlFor="account-newPassword"
            >
              <span className="account-setting__title SFPro-700">
                {translate("accountSettings.newPassword")}
              </span>
              {!newPasswordValid && (
                <span className="account-setting__subtitle">
                  {translate("accountSettings.minimum")}
                </span>
              )}
              <input
                onChange={() => setNewPasswordValid(true)}
                ref={newPasswordRef}
                type="password"
                id="account-newPassword"
                autoComplete="on"
              />
            </label>
            <label
              className={`account-setting__label${
                !confirmPasswordValid || !newPasswordValid ? " invalid" : ""
              }`}
              htmlFor="account-confirmPassword"
            >
              <span className="account-setting__title SFPro-700">
                {translate("accountSettings.confirmPassword")}
              </span>
              {!confirmPasswordValid && (
                <span className="account-setting__subtitle">
                  {translate("accountSettings.invalid")}
                </span>
              )}
              <input
                onChange={() => setConfirmPasswordValid(true)}
                ref={confirmPasswordRef}
                type="password"
                id="account-confirmPassword"
                autoComplete="on"
              />
            </label>
            <button className="account-setting__submit SFPro-600" type="submit">
              {translate("editProfilePage.button")}
            </button>
          </form>
          <div className="account-setting__svg">
            <EditProfileSvg />
          </div>
        </div>
      </div>
      <LoadingSpinnerPopup showSpinner={isLoading} />
    </>
  );
};

export default AccountSetting;
