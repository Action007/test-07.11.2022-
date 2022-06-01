import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./MyProfileInfo.scss";

import { ReactComponent as Setting } from "../../../../assets/images/icon/setting.svg";
import { ReactComponent as Facebook } from "../../../../assets/images/icon/facebook.svg";
import { ReactComponent as Twitter } from "../../../../assets/images/icon/twitter.svg";
import { ReactComponent as Instagram } from "../../../../assets/images/icon/instagram.svg";
import { ReactComponent as World } from "../../../../assets/images/icon/world.svg";
import { ReactComponent as EditSvg } from "../../../../assets/images/icon/editPhoto.svg";
import { ReactComponent as EmptySvg } from "../../../../assets/images/icon/emptyPhoto.svg";

const MyProfileInfo = ({ user }) => {
  const navigate = useNavigate();
  const { t: translate } = useTranslation();

  return (
    <div className="profile-info">
      <div className="profile-info__inner">
        <div className="profile-info__box">
          <button className="profile-info__edit-btn" type="button">
            <div className="profile-info__img">
              <EmptySvg />
            </div>
            {/* <img src={ProfileImg} alt="account" /> */}
            <EditSvg />
          </button>
          <div>
            {user?.name && (
              <h1 className="profile-info__title SFPro-700">{user.name}</h1>
            )}
            {user?.country && (
              <span className="profile-info__subtitle">{user.country}</span>
            )}
            {user?.nickname && (
              <span className="profile-info__name SFPro-700">
                @{user.nickname}
              </span>
            )}
          </div>
        </div>
        {user?.bio.length !== 0 && (
          <>
            <span className="profile-info__span">
              {translate("profilePage.aboutMe")}
            </span>
            <p className="profile-info__text">{user?.bio}</p>
          </>
        )}
        {(user?.facebook || user?.twitter || user?.instagram || user?.site) && (
          <ul className="profile-info__networks">
            {user?.facebook && (
              <li className="profile-info__network">
                <a href={user.facebook} target="_blank" rel="noreferrer">
                  <Facebook />
                </a>
              </li>
            )}
            {user?.twitter && (
              <li className="profile-info__network">
                <a href={user.twitter} target="_blank" rel="noreferrer">
                  <Twitter />
                </a>
              </li>
            )}
            {user?.instagram && (
              <li className="profile-info__network">
                <a href={user.instagram} target="_blank" rel="noreferrer">
                  <Instagram />
                </a>
              </li>
            )}
            {user?.site && (
              <li className="profile-info__network profile-info__network--website">
                <a href={user.site} target="_blank" rel="noreferrer">
                  <World />
                  <span className="profile-info__link">
                    {user.site.replace(/https?:\/\//g, "")}
                  </span>
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
      <div className="profile-info__edit">
        <button
          onClick={() => navigate(`/edit-profile`)}
          className="profile-info__button SFPro-600"
          type="button"
        >
          {translate("profilePage.editProfile")}
        </button>
        <button
          onClick={() => navigate(`/account-settings`)}
          className="profile-info__setting"
          type="button"
        >
          <Setting />
        </button>
      </div>
    </div>
  );
};

export default MyProfileInfo;
