import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEditAccountMutation } from "../../../../services/accountService";
import isServerError from "../../../../utils/isServerError";
import LoadingSpinnerPopup from "../../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import "./ProfileInfo.scss";

import brokenImg from "../../../../assets/images/icon/brokenImg.svg";
import { ReactComponent as Setting } from "../../../../assets/images/icon/setting.svg";
import { ReactComponent as Facebook } from "../../../../assets/images/icon/facebook.svg";
import { ReactComponent as Twitter } from "../../../../assets/images/icon/twitter.svg";
import { ReactComponent as Instagram } from "../../../../assets/images/icon/instagramDark.svg";
import { ReactComponent as Linkedin } from "../../../../assets/images/icon/linkedin.svg";
import { ReactComponent as World } from "../../../../assets/images/icon/world.svg";
import { ReactComponent as EditSvg } from "../../../../assets/images/icon/editPhoto.svg";
import { ReactComponent as EmptySvg } from "../../../../assets/images/icon/emptyPhoto.svg";

const ProfileInfo = ({
  name,
  nickname,
  country,
  bio,
  site,
  facebook,
  twitter,
  instagram,
  linkedin,
  avatar_url,
  isMyAccount,
  onLargeImageSize,
}) => {
  const [avatar, setAvatar] = useState(avatar_url);
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const [imageUpload, { isLoading: isUpdateLoading, error, data }] =
    useEditAccountMutation();
  const host = site ? new URL(site).hostname : "";
  const hostURL = site ? window.location.origin : "";

  useEffect(() => {
    if (error && error.data.message[0].type === "file_size_out_of_range") {
      onLargeImageSize();
      return;
    }
    if (isServerError(error?.status)) {
      navigate("/error", { replace: true });
    }
  }, [error]);

  useEffect(() => {
    if (data) setAvatar(data.avatar_url);
  }, [data]);

  const onImageUpload = (event) => {
    const image = event.target.files[0];
    if (image.size > 2e6) {
      onLargeImageSize();
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      imageUpload({
        avatar: reader.result,
      });
    };
  };

  const onErrorImgHandler = (e) => {
    e.target.src = brokenImg;
    e.target.alt = "broken image";
    e.target.className = "broken";
  };

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isUpdateLoading} />
      <div className="profile-info">
        <div className="profile-info__inner">
          <div className="profile-info__box">
            <label
              className={`profile-info__edit-btn${
                isMyAccount ? " pointer" : ""
              }`}
              htmlFor="uploadImg"
            >
              <div className="profile-info__img">
                {avatar ? (
                  <img onError={onErrorImgHandler} src={avatar} alt="account" />
                ) : (
                  <EmptySvg />
                )}
              </div>
              {isMyAccount && (
                <>
                  <EditSvg />
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={onImageUpload}
                    className="profile-info__input"
                    id="uploadImg"
                  />
                </>
              )}
            </label>
            <div>
              {name && (
                <h1 className="profile-info__title SFPro-700">{name}</h1>
              )}
              {country && (
                <span
                  className={`profile-info__subtitle${
                    !country ? " empty" : ""
                  }`}
                >
                  {country}
                </span>
              )}
              {nickname && (
                <span className="profile-info__name SFPro-700">
                  <a
                    href={`${hostURL}/${nickname}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @{nickname}
                  </a>
                </span>
              )}
            </div>
          </div>
          <span
            className={`profile-info__span${bio.length === 0 ? " empty" : ""}`}
          >
            {isMyAccount
              ? translate("profilePage.aboutMe")
              : translate("profilePage.about")}
          </span>
          <p
            className={`profile-info__text${bio.length === 0 ? " empty" : ""}`}
          >
            {bio.length !== 0 ? bio : translate("profilePage.emptyBio")}
          </p>
          {(!!facebook || !!twitter || !!instagram || !!site || !!linkedin) && (
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
              {linkedin && (
                <li className="profile-info__network">
                  <a href={linkedin} target="_blank" rel="noreferrer">
                    <Linkedin />
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
              {site && (
                <li className="profile-info__network profile-info__network--site">
                  <a href={site} target="_blank" rel="noreferrer">
                    <World />
                    <span className="profile-info__link">
                      {host.length > 15 ? `${host.substring(0, 16)}...` : host}
                    </span>
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>
        {isMyAccount && (
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
        )}
      </div>
    </>
  );
};

export default ProfileInfo;
