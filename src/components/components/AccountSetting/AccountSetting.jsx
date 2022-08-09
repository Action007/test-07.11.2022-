import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useResetAccountPasswordMutation } from "../../../services/accountService";
import validateEmail from "../../../utils/validateEmail";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import Notification from "../../UI/Notification/Notification";
import audio from "../../../assets/sound/song.mp3";
import "./AccountSetting.scss";

import { ReactComponent as EditProfileSvg } from "../../../assets/images/content/account-settings.svg";

const AccountSetting = () => {
  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetAccountPasswordMutation();
  const user = useSelector((state) => state.authSliceReducer.user);
  const [emilValue, setEmailValue] = useState("@");
  const confirmPasswordRef = useRef();
  const [emailValid, setEmailValid] = useState(true);
  const [oldPasswordValid, setOldPasswordValid] = useState(true);
  const [oldPasswordIncorrect, setOldPasswordIncorrect] = useState(true);
  const [newPasswordValid, setNewPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [errorMatchPassword, setErrorMatchPassword] = useState(false);
  const [notification, setNotification] = useState(false);
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const song = new Audio(audio);
  song.volume = 0.1;

  const breadcrumbs = [
    {
      title: user?.nickname,
      link: `/${user?.nickname}`,
    },
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
    let showNotification;
    if (isSuccess) {
      setNotification(true);
      song.play();
      showNotification = setTimeout(() => setNotification(false), 5000);
    }

    return () => {
      if (showNotification) clearTimeout(showNotification);
    };
  }, [isSuccess]);

  useEffect(() => {
    if (user) setEmailValue(user.email);
  }, [user]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const email = validateEmail(emilValue);
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value.length > 7;
    if (newPassword) {
      setErrorMatchPassword(
        oldPasswordRef.current.value === newPasswordRef.current.value
      );
    }
    const confirmPassword =
      confirmPasswordRef.current.value === newPasswordRef.current.value;

    setEmailValid(!!email);
    setOldPasswordValid(oldPassword);
    setNewPasswordValid(newPassword);
    setConfirmPasswordValid(confirmPassword);
    setOldPasswordIncorrect(true);

    if (
      email &&
      oldPassword &&
      newPassword &&
      confirmPassword &&
      !errorMatchPassword
    ) {
      resetPassword({
        old_password: oldPasswordRef.current.value,
        new_password: newPasswordRef.current.value,
        new_password_confirmation: confirmPasswordRef.current.value,
      });
      oldPasswordRef.current.value = "";
      newPasswordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    }
  };

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isLoading} />
      {isSuccess && notification && (
        <Notification translate={translate("notification.profileUpdate")} />
      )}
      <div
        className={`account-setting container${
          notification ? " show-notification" : ""
        }`}
      >
        {user && <Breadcrumbs breadcrumbs={breadcrumbs} />}
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
                !newPasswordValid || errorMatchPassword ? " invalid" : ""
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
              {errorMatchPassword && (
                <span className="account-setting__subtitle">
                  {translate("accountSettings.passwordMatch")}
                </span>
              )}
              <input
                onChange={() => {
                  setNewPasswordValid(true);
                  setErrorMatchPassword(false);
                }}
                ref={newPasswordRef}
                type="password"
                id="account-newPassword"
                autoComplete="on"
              />
            </label>
            <label
              className={`account-setting__label${
                !confirmPasswordValid || !newPasswordValid || errorMatchPassword
                  ? " invalid"
                  : ""
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
    </>
  );
};

export default AccountSetting;
