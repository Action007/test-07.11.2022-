/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import validateEmail from "../../../utils/validateEmail";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./AccountSetting.scss";

import { ReactComponent as EditProfileSvg } from "../../../assets/images/content/account-settings.svg";

const AccountSetting = () => {
  const user = useSelector((state) => state.authSliceReducer.user);
  const [emilValue, setEmailValue] = useState("@");
  const confirmPasswordRef = useRef();
  const [emailValid, setEmailValid] = useState(true);
  const [oldPasswordValid, setOldPasswordValid] = useState(true);
  const [newPasswordValid, setNewPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const { t: translate } = useTranslation();
  const breadcrumbs = [
    { title: translate("profilePage.myProfile"), link: "/my-profile" },
    { title: translate("accountSettings.accountSettings") },
  ];

  useEffect(() => {
    if (user) setEmailValue(user.email);
  }, [user]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const email = validateEmail(emilValue);
    const oldPassword = oldPasswordRef.current.value.trim().length > 7;
    const newPassword = newPasswordRef.current.value.trim().length > 7;
    const confirmPassword =
      confirmPasswordRef.current.value.length &&
      confirmPasswordRef.current.value === oldPasswordRef.current.value;

    setEmailValid(!!email);
    setOldPasswordValid(oldPassword);
    setNewPasswordValid(newPassword);
    setConfirmPasswordValid(confirmPassword);
  };

  return (
    <div className="account-setting container">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="account-setting__wrapper">
        <form
          onSubmit={(e) => onSubmitHandler(e)}
          className="account-setting__form"
        >
          <label
            className={`account-setting__label${!emailValid ? " invalid" : ""}`}
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
            />
          </label>
          <label
            className={`account-setting__label${
              !oldPasswordValid ? " invalid" : ""
            }`}
          >
            <span className="account-setting__title account-setting__title--two SFPro-700">
              {translate("accountSettings.oldPassword")}
            </span>
            <input
              onChange={() => setOldPasswordValid(true)}
              ref={oldPasswordRef}
              type="password"
            />
          </label>
          <label
            className={`account-setting__label${
              !newPasswordValid ? " invalid" : ""
            }`}
          >
            <span className="account-setting__title SFPro-700">
              {translate("accountSettings.newPassword")}
            </span>
            <span className="account-setting__subtitle">
              {translate("accountSettings.minimum")}
            </span>
            <input
              onChange={() => setNewPasswordValid(true)}
              ref={newPasswordRef}
              type="password"
            />
          </label>
          <label
            className={`account-setting__label${
              !confirmPasswordValid ? " invalid" : ""
            }`}
          >
            <span className="account-setting__title SFPro-700">
              {translate("accountSettings.confirmPassword")}
            </span>
            <span className="account-setting__subtitle">
              {translate("accountSettings.minimum")}
            </span>
            <input
              onChange={() => setConfirmPasswordValid(true)}
              ref={confirmPasswordRef}
              type="password"
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
  );
};

export default AccountSetting;
