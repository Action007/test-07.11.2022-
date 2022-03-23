/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./AccountSetting.scss";

import { ReactComponent as EditProfileSvg } from "../../../assets/images/content/account-settings.svg";

const AccountSetting = () => {
  const { t: translate } = useTranslation();

  const breadcrumbs = [
    { title: translate("profilePage.myProfile"), link: "/my-profile" },
    { title: translate("editProfilePage.editProfile") },
  ];

  return (
    <div className="account-setting container">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="account-setting__wrapper">
        <form className="account-setting__form">
          <label className="account-setting__label">
            <span className="account-setting__title account-setting__title--one SFPro-700">
              {translate("accountSettings.email")}
            </span>
            <input type="text" />
          </label>
          <label className="account-setting__label">
            <span className="account-setting__title account-setting__title--two SFPro-700">
              {translate("accountSettings.oldPassword")}
            </span>
            <input type="password" />
          </label>
          <label className="account-setting__label">
            <span className="account-setting__title SFPro-700">
              {translate("accountSettings.newPassword")}
            </span>
            <span className="account-setting__subtitle">
              {translate("accountSettings.minimum")}
            </span>
            <input type="password" />
          </label>
          <label className="account-setting__label">
            <span className="account-setting__title SFPro-700">
              {translate("accountSettings.confirmPassword")}
            </span>
            <span className="account-setting__subtitle">
              {translate("accountSettings.minimum")}
            </span>
            <input type="password" />
          </label>
          <button className="account-setting__submit SFPro-600" type="button">
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
