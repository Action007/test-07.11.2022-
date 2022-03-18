import React from "react";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./Profile.scss";

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
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__inner">
            <div className="profile__box">
              <div className="profile__img">
                <img src={ProfileImg} alt="account" />
              </div>
              <h1 className="profile__title">Aleksandr Vtorov</h1>
              <span className="profile__subtitle">Poznań, Poland</span>
              <span className="profile__name">@alex64</span>
            </div>
            <div className="profile__span">About me</div>
            <p className="profile__text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
              Lorem ipsum dolor sit.
            </p>
            <ul>
              <li>
                <a href="/" target="_blank" rel="noreferrer">
                  <Facebook />
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noreferrer">
                  <Twitter />
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noreferrer">
                  <Instagram />
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noreferrer">
                  <World />
                  proxyone.eu
                </a>
              </li>
            </ul>
          </div>
          <div className="profile__edit">
            <button className="profile__button" type="button">
              Edit Profile
            </button>
            <button className="profile__setting" type="button">
              <Setting />
            </button>
          </div>
        </div>
        <div className="profile__wrap">
          <span className="profile__head">My awards</span>
          <ul className="profile__items">
            <li className="profile__item">
              <List />
              <span className="profile__num">3</span>
              {translate("profilePage.myAwards")}
            </li>
            <li className="profile__item">
              <Cup />
              <span className="profile__num">30</span>
              {translate("profilePage.completedChecklists")}
            </li>
            <li className="profile__item">
              <Added />
              <span className="profile__num">5</span>
              {translate("profilePage.createdChecklists")}
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Profile;
