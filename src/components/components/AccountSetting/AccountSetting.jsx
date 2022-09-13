import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useResetAccountPasswordMutation } from "../../../services/accountService";
import validateEmail from "../../../utils/validateEmail";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import isServerError from "../../../utils/isServerError";
import Notification from "../../UI/Notification/Notification";
import audio from "../../../assets/sound/song.mp3";
import "./AccountSetting.scss";

import { ReactComponent as EditProfileSvg } from "../../../assets/images/content/account-settings.svg";

const AccountSetting = () => {
  const [resetPassword, { isLoading, isSuccess, error }] =
    useResetAccountPasswordMutation();
  const user = useSelector((state) => state.authSliceReducer.user);
  const [emilValue, setEmailValue] = useState("@");
  const confirmPasswordRef = useRef();
  const [emailValid, setEmailValid] = useState(true);
  const [oldPasswordValid, setOldPasswordValid] = useState(true);
  const [oldPasswordIncorrect, setOldPasswordIncorrect] = useState(true);
  const [isPasswordTooLong, setIsPasswordTooLong] = useState(false);
  const [newPasswordValid, setNewPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [notification, setNotification] = useState(false);
  const [isValidError, setIsValidError] = useState([]);
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
    if (isServerError(error?.status)) navigate("/error", { replace: true });
    if (!error?.data?.message) return;

    const { message } = error.data;
    if (
      message[0]?.attribute === "old_password" &&
      message[0]?.type === "invalid"
    ) {
      setOldPasswordIncorrect(false);
    } else {
      setIsValidError(message);
    }
  }, [error]);

  useEffect(() => {
    let showNotification;
    if (isSuccess) {
      setNotification(true);
      song.play();
      showNotification = setTimeout(() => setNotification(false), 5000);

      oldPasswordRef.current.value = "";
      newPasswordRef.current.value = "";
      confirmPasswordRef.current.value = "";
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
    const newPasswordMin = newPasswordRef.current.value.length > 7;
    const newPasswordMax = newPasswordRef.current.value.length < 73;
    const confirmPassword =
      confirmPasswordRef.current.value === newPasswordRef.current.value;

    setEmailValid(!!email);
    setOldPasswordValid(oldPassword);
    setConfirmPasswordValid(confirmPassword);
    setNewPasswordValid(newPasswordMin);
    setIsPasswordTooLong(!newPasswordMax);
    setOldPasswordIncorrect(true);

    if (
      email &&
      oldPassword &&
      newPasswordMin &&
      newPasswordMax &&
      confirmPassword
    ) {
      resetPassword({
        old_password: oldPasswordRef.current.value,
        new_password: newPasswordRef.current.value,
        new_password_confirmation: confirmPasswordRef.current.value,
      });
    }
  };

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isLoading} />
      {isSuccess && notification && (
        <Notification
          translate={translate("accountSettings.passwordChanged")}
        />
      )}
      <div
        className={`account-setting container${
          notification ? " show-notification" : ""
        }`}
      >
        {user && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        <div className="account-setting__wrapper">
          <form onSubmit={onSubmitHandler} className="account-setting__form">
            <label
              className={`account-setting__label${
                !emailValid ? " account-setting__label--invalid" : ""
              }`}
              htmlFor="account-email"
            >
              <span className="creation__span invalid">
                {isValidError.length > 0 ? isValidError[0].type : ""}
              </span>
              <span className="account-setting__title account-setting__title--one SFPro-700">
                {translate("accountSettings.email")}
              </span>
              <input
                value={emilValue}
                type="email"
                id="account-email"
                disabled
              />
            </label>
            <label
              className={`account-setting__label${
                !oldPasswordValid || !oldPasswordIncorrect
                  ? " account-setting__label--invalid"
                  : ""
              }`}
              htmlFor="account-oldPassword"
            >
              <span className="creation__span invalid">
                {isValidError.length > 0 ? isValidError[1].type : ""}
              </span>
              <span className="account-setting__title account-setting__title--two SFPro-700">
                {translate("accountSettings.oldPassword")}
              </span>
              {!oldPasswordIncorrect && (
                <span className="account-setting__subtitle">
                  {translate("accountSettings.incorrect")}
                </span>
              )}
              <input
                ref={oldPasswordRef}
                type="password"
                id="account-oldPassword"
                autoComplete="on"
              />
            </label>
            <label
              className={`account-setting__label${
                !newPasswordValid || isPasswordTooLong
                  ? " account-setting__label--invalid"
                  : ""
              }`}
              htmlFor="account-newPassword"
            >
              <span className="creation__span invalid">
                {isValidError.length > 0 ? isValidError[2].type : ""}
              </span>
              <span className="account-setting__title SFPro-700">
                {translate("accountSettings.newPassword")}
              </span>
              {!newPasswordValid && (
                <span className="account-setting__subtitle">
                  {translate("accountSettings.minimum")}
                </span>
              )}
              {isPasswordTooLong && (
                <span className="account-setting__subtitle">
                  {translate("accountSettings.maxPassword")}
                </span>
              )}
              <input
                ref={newPasswordRef}
                type="password"
                id="account-newPassword"
                autoComplete="on"
              />
            </label>
            <label
              className={`account-setting__label${
                !confirmPasswordValid || !newPasswordValid
                  ? " account-setting__label--invalid"
                  : ""
              }`}
              htmlFor="account-confirmPassword"
            >
              <span className="creation__span invalid">
                {isValidError.length > 0 ? isValidError[3].type : ""}
              </span>
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
