import React from "react";
import { useTranslation } from "react-i18next";
import "./ProfileSkeleton.scss";

import { ReactComponent as Facebook } from "../../../assets/images/icon/facebook.svg";
import { ReactComponent as Twitter } from "../../../assets/images/icon/twitter.svg";
import { ReactComponent as Instagram } from "../../../assets/images/icon/instagram.svg";
import { ReactComponent as World } from "../../../assets/images/icon/world.svg";
import { ReactComponent as EditSvg } from "../../../assets/images/icon/editPhoto.svg";

const ProfileSkeleton = () => {
  const { t: translate } = useTranslation();

  return (
    <div className="profile-skeleton">
      <div className="profile-skeleton__info">
        <div className="profile-skeleton__wrapper">
          <div className="profile-skeleton__wrap">
            <div className="profile-skeleton__edit">
              <div className="loading-skeleton profile-skeleton__img" />
              <EditSvg />
            </div>
            <div className="profile-skeleton__inner">
              <span className="loading-skeleton profile-skeleton__title" />
              <span className="loading-skeleton profile-skeleton__subtitle" />
              <span className="loading-skeleton profile-skeleton__name" />
            </div>
          </div>
          <span className="profile-skeleton__span">
            {translate("profilePage.aboutMe")}
          </span>
          <p className="loading-skeleton profile-skeleton__text" />
          <p className="loading-skeleton profile-skeleton__text" />
          <p className="loading-skeleton profile-skeleton__text" />
          <p className="loading-skeleton profile-skeleton__text profile-skeleton__text--last" />
          <ul className="profile-skeleton__networks">
            <li className="profile-skeleton__network">
              <Facebook />
            </li>
            <li className="profile-skeleton__network">
              <Twitter />
            </li>
            <li className="profile-skeleton__network">
              <Instagram />
            </li>
            <li className="profile-skeleton__network profile-skeleton__network--website">
              <World />
            </li>
          </ul>
        </div>
        <div className="profile-skeleton__buttons">
          <div className="loading-skeleton profile-skeleton__button" />
          <div className="loading-skeleton profile-skeleton__setting" />
        </div>
      </div>
      <div className="profile-skeleton__awards">
        <span className="profile-skeleton__span">
          {translate("profilePage.myAwards")}
        </span>
        <div className="profile-skeleton__box">
          <div className="loading-skeleton" />
          <div className="loading-skeleton" />
          <div className="loading-skeleton" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
