import React from "react";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./EditProfile.scss";

import { ReactComponent as EditProfileSvg } from "../../../assets/images/content/editProfile.svg";

const EditProfile = () => {
  const { t: translate } = useTranslation();

  const breadcrumbs = [
    { title: translate("profilePage.myProfile"), link: "/my-profile" },
    { title: translate("editProfilePage.editProfile") },
  ];

  return (
    <div className="edit-profile container">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="edit-profile__wrapper">
        <form className="edit-profile__form">
          <label className="edit-profile__label" htmlFor="edit-name">
            <span className="edit-profile__title edit-profile__title--star SFPro-700">
              {translate("editProfilePage.name")}
            </span>
            <span className="edit-profile__subtitle">
              {translate("editProfilePage.max")}
            </span>
            <input type="text" id="edit-name" />
          </label>
          <label className="edit-profile__label" htmlFor="edit-name">
            <span className="edit-profile__title edit-profile__title--star SFPro-700">
              {translate("editProfilePage.nickName")}
            </span>
            <span className="edit-profile__subtitle">
              {translate("editProfilePage.max")}
            </span>
            <input type="text" id="edit-name" />
          </label>
          <label className="edit-profile__label" htmlFor="edit-name">
            <span className="edit-profile__title SFPro-700">
              {translate("editProfilePage.location")}
            </span>
            <input type="text" id="edit-name" />
          </label>
          <label className="edit-profile__label" htmlFor="edit-name">
            <span className="edit-profile__title SFPro-700">
              {translate("editProfilePage.bio")}
            </span>
            <span className="edit-profile__subtitle">
              {translate("editProfilePage.bioMax")}
            </span>
            <textarea />
          </label>
          <label className="edit-profile__label" htmlFor="edit-name">
            <span className="edit-profile__title SFPro-700">
              {translate("editProfilePage.website")}
            </span>
            <input type="text" id="edit-name" />
          </label>
          <label className="edit-profile__label" htmlFor="edit-name">
            <span className="edit-profile__title SFPro-700">
              {translate("editProfilePage.facebook")}
            </span>
            <input type="text" id="edit-name" />
          </label>
          <label className="edit-profile__label" htmlFor="edit-name">
            <span className="edit-profile__title SFPro-700">
              {translate("editProfilePage.instagram")}
            </span>
            <input type="text" id="edit-name" />
          </label>
          <label className="edit-profile__label" htmlFor="edit-name">
            <span className="edit-profile__title SFPro-700">
              {translate("editProfilePage.twitter")}
            </span>
            <input type="text" id="edit-name" />
          </label>
          <button className="edit-profile__submit SFPro-600" type="button">
            {translate("editProfilePage.button")}
          </button>
        </form>
        <EditProfileSvg />
      </div>
    </div>
  );
};

export default EditProfile;
