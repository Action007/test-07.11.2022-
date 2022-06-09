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

const MyProfileInfo = ({
  name,
  nickname,
  country,
  bio,
  website,
  facebook,
  twitter,
  instagram,
}) => {
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
            {name && <h1 className="profile-info__title SFPro-700">{name}</h1>}
            <span
              className={`profile-info__subtitle${!country ? " empty" : ""}`}
            >
              {country || translate("profilePage.country")}
            </span>
            {nickname && (
              <span className="profile-info__name SFPro-700">@{nickname}</span>
            )}
          </div>
        </div>
        <span
          className={`profile-info__span${bio.length === 0 ? " empty" : ""}`}
        >
          {translate("profilePage.aboutMe")}
        </span>
        <p className={`profile-info__text${bio.length === 0 ? " empty" : ""}`}>
          {bio.length !== 0 ? bio : translate("profilePage.emptyBio")}
        </p>
        {facebook || twitter || instagram || website ? (
          <ul className="profile-info__networks">
            {facebook && (
              <li className="profile-info__network">
                <a href={facebook} target="_blank" rel="noreferrer">
                  <Facebook />
                </a>
              </li>
            )}
            {twitter && (
              <li className="profile-info__network">
                <a href={twitter} target="_blank" rel="noreferrer">
                  <Twitter />
                </a>
              </li>
            )}
            {instagram && (
              <li className="profile-info__network">
                <a href={instagram} target="_blank" rel="noreferrer">
                  <Instagram />
                </a>
              </li>
            )}
            {website && (
              <li className="profile-info__network profile-info__network--website">
                <a href={website} target="_blank" rel="noreferrer">
                  <World />
                  <span className="profile-info__link">
                    {website.replace(/https?:\/\//g, "")}
                  </span>
                </a>
              </li>
            )}
          </ul>
        ) : (
          <ul className="profile-info__networks">
            <li className="profile-info__network empty">
              <Facebook />
            </li>
            <li className="profile-info__network empty">
              <Twitter />
            </li>
            <li className="profile-info__network empty">
              <Instagram />
            </li>
            <li className="profile-info__network profile-info__network--website empty">
              <World />
            </li>
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
