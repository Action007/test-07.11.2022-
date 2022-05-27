import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./MyProfile.scss";

// import ProfileImg from "../../../assets/images/content/profile.png";
import { ReactComponent as Setting } from "../../../assets/images/icon/setting.svg";
import { ReactComponent as Facebook } from "../../../assets/images/icon/facebook.svg";
import { ReactComponent as Twitter } from "../../../assets/images/icon/twitter.svg";
import { ReactComponent as Instagram } from "../../../assets/images/icon/instagram.svg";
import { ReactComponent as World } from "../../../assets/images/icon/world.svg";
import { ReactComponent as List } from "../../../assets/images/icon/list.svg";
import { ReactComponent as Cup } from "../../../assets/images/icon/cup.svg";
import { ReactComponent as Added } from "../../../assets/images/icon/added.svg";
import { ReactComponent as EditSvg } from "../../../assets/images/icon/editPhoto.svg";
import { ReactComponent as EmptySvg } from "../../../assets/images/icon/emptyPhoto.svg";

const Profile = () => {
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const user = useSelector((state) => state.authSliceReducer.user);
  const breadcrumbs = [{ title: translate("profilePage.myProfile") }];

  return (
    <div className="profile container">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="profile__wrapper">
        <div className="profile__inner">
          <div className="profile__box">
            <button className="profile__edit-btn" type="button">
              <div className="profile__img">
                <EmptySvg />
              </div>
              {/* <img src={ProfileImg} alt="account" /> */}
              <EditSvg />
            </button>
            <div>
              {user && user.name && (
                <h1 className="profile__title SFPro-700">{user.name}</h1>
              )}
              {user && user.country && (
                <span className="profile__subtitle">{user.country}</span>
              )}
              {user && user.nickname && (
                <span className="profile__name SFPro-700">
                  @{user.nickname}
                </span>
              )}
            </div>
          </div>
          {user && user.bio.length !== 0 && (
            <>
              <span className="profile__span">
                {translate("profilePage.aboutMe")}
              </span>
              <p className="profile__text">{user.bio}</p>
            </>
          )}
          {user &&
            (user.facebook || user.twitter || user.instagram || user.site) && (
              <ul className="profile__networks">
                {user.facebook && (
                  <li className="profile__network">
                    <a href={user.facebook} target="_blank" rel="noreferrer">
                      <Facebook />
                    </a>
                  </li>
                )}
                {user.twitter && (
                  <li className="profile__network">
                    <a href={user.twitter} target="_blank" rel="noreferrer">
                      <Twitter />
                    </a>
                  </li>
                )}
                {user.instagram && (
                  <li className="profile__network">
                    <a href={user.instagram} target="_blank" rel="noreferrer">
                      <Instagram />
                    </a>
                  </li>
                )}
                {user.site && (
                  <li className="profile__network">
                    <a href={user.site} target="_blank" rel="noreferrer">
                      <World />
                      {user.site}
                    </a>
                  </li>
                )}
              </ul>
            )}
        </div>
        <div className="profile__edit">
          <button
            onClick={() => navigate(`/edit-profile`)}
            className="profile__button SFPro-600"
            type="button"
          >
            {translate("profilePage.editProfile")}
          </button>
          <button
            onClick={() => navigate(`/account-settings`)}
            className="profile__setting"
            type="button"
          >
            <Setting />
          </button>
        </div>
      </div>
      {user &&
        (!!user.created_counter ||
          !!user.completed_counter ||
          !!user.awards_counter) && (
          <div className="profile__wrap">
            <span className="profile__head">
              {translate("profilePage.myAwards")}
            </span>
            <ul className="profile__items">
              {!!user.completed_counter && (
                <li className="profile__item SFPro-600">
                  <div className="profile__svg">
                    <List />
                  </div>
                  <div>
                    <span className="profile__num SFPro-700">
                      {user.completed_counter}
                    </span>
                    <div className="profile__desc">
                      {translate("profilePage.completedChecklists")}
                    </div>
                  </div>
                </li>
              )}
              {!!user.awards_counter && (
                <li className="profile__item SFPro-600">
                  <div className="profile__svg">
                    <Cup />
                  </div>
                  <div>
                    <span className="profile__num SFPro-700">
                      {user.awards_counter}
                    </span>
                    <div className="profile__desc">
                      {translate("profilePage.myAwards")}
                    </div>
                  </div>
                </li>
              )}
              {!!user.created_counter && (
                <li className="profile__item SFPro-600">
                  <div className="profile__svg">
                    <Added />
                  </div>
                  <div>
                    <span className="profile__num SFPro-700">
                      {user.created_counter}
                    </span>
                    <div className="profile__desc">
                      {translate("profilePage.createdChecklists")}
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}
    </div>
  );
};

export default Profile;
