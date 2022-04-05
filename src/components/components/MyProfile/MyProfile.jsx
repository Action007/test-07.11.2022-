import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./MyProfile.scss";

import ProfileImg from "../../../assets/images/content/profile.png";
import { ReactComponent as Setting } from "../../../assets/images/icon/setting.svg";
import { ReactComponent as Facebook } from "../../../assets/images/icon/facebook.svg";
import { ReactComponent as Twitter } from "../../../assets/images/icon/twitter.svg";
import { ReactComponent as Instagram } from "../../../assets/images/icon/instagram.svg";
import { ReactComponent as World } from "../../../assets/images/icon/world.svg";
import { ReactComponent as List } from "../../../assets/images/icon/list.svg";
import { ReactComponent as Cup } from "../../../assets/images/icon/cup.svg";
import { ReactComponent as Added } from "../../../assets/images/icon/added.svg";

const Profile = () => {
  const { t: translate } = useTranslation();
  const breadcrumbs = [{ title: translate("profilePage.myProfile") }];

  return (
    <div className="profile container">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="profile__wrapper">
        <div className="profile__inner">
          <div className="profile__box">
            <div className="profile__img">
              <img src={ProfileImg} alt="account" />
            </div>
            <div>
              <h1 className="profile__title SFPro-700">Aleksandr Vtorov</h1>
              <span className="profile__subtitle">Poznań, Poland</span>
              <span className="profile__name SFPro-700">@alex64</span>
            </div>
          </div>
          <span className="profile__span">
            {translate("profilePage.aboutMe")}
          </span>
          <p className="profile__text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer
            adipiscing elit. Aenean commodo ligula eget dolor. Lorem ipsum dolor
            sit.
          </p>
          <ul className="profile__networks">
            <li className="profile__network">
              <a href="/" target="_blank" rel="noreferrer">
                <Facebook />
              </a>
            </li>
            <li className="profile__network">
              <a href="/" target="_blank" rel="noreferrer">
                <Twitter />
              </a>
            </li>
            <li className="profile__network">
              <a href="/" target="_blank" rel="noreferrer">
                <Instagram />
              </a>
            </li>
            <li className="profile__network">
              <a href="/" target="_blank" rel="noreferrer">
                <World />
                proxyone.eu
              </a>
            </li>
          </ul>
        </div>
        <div className="profile__edit">
          <Link
            to="/edit-profile"
            className="profile__button SFPro-600"
            type="button"
          >
            {translate("profilePage.editProfile")}
          </Link>
          <Link
            to="/account-settings"
            className="profile__setting"
            type="button"
          >
            <Setting />
          </Link>
        </div>
      </div>
      <div className="profile__wrap">
        <span className="profile__head">
          {translate("profilePage.myAwards")}
        </span>
        <ul className="profile__items">
          <li className="profile__item SFPro-600">
            <div className="profile__svg">
              <List />
            </div>
            <div>
              <span className="profile__num SFPro-700">3</span>
              <div className="profile__desc">
                {translate("profilePage.completedChecklists")}
              </div>
            </div>
          </li>
          <li className="profile__item SFPro-600">
            <div className="profile__svg">
              <Cup />
            </div>
            <div>
              <span className="profile__num SFPro-700">30</span>
              <div className="profile__desc">
                {translate("profilePage.myAwards")}
              </div>
            </div>
          </li>
          <li className="profile__item SFPro-600">
            <div className="profile__svg">
              <Added />
            </div>
            <div>
              <span className="profile__num SFPro-700">5</span>
              <div className="profile__desc">
                {translate("profilePage.createdChecklists")}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
