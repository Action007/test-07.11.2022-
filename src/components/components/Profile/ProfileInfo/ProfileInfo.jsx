import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../../../../services/checklistService";
import LoadingSpinnerPopup from "../../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import "./ProfileInfo.scss";

import { ReactComponent as Setting } from "../../../../assets/images/icon/setting.svg";
import { ReactComponent as Facebook } from "../../../../assets/images/icon/facebook.svg";
import { ReactComponent as Twitter } from "../../../../assets/images/icon/twitter.svg";
import { ReactComponent as Instagram } from "../../../../assets/images/icon/instagram.svg";
import { ReactComponent as World } from "../../../../assets/images/icon/world.svg";
import { ReactComponent as EditSvg } from "../../../../assets/images/icon/editPhoto.svg";
import { ReactComponent as EmptySvg } from "../../../../assets/images/icon/emptyPhoto.svg";

const ProfileInfo = ({
  name,
  nickname,
  country,
  bio,
  website,
  facebook,
  twitter,
  instagram,
  avatar_url,
  onLargeImageSize,
}) => {
  const user = useSelector((state) => state.authSliceReducer.user);
  const [avatar, setAvatar] = useState(avatar_url);
  const { pathname } = useLocation();
  const isMyProfile = pathname === "/my-profile";
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const [imageUpload, { isLoading: isUpdateLoading, isError, error, data }] =
    checklistAPI.useEditAccountMutation();
  const host = website ? new URL(website).hostname : "";

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

  useEffect(() => {
    if (error && error.data.message[0].type === "file_size_out_of_range") {
      onLargeImageSize();
    } else if (isError) {
      navigate("/error");
    }
  }, [error]);

  useEffect(() => {
    if (data) setAvatar(data.avatar_url);
  }, [data]);

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isUpdateLoading} />
      <div className="profile-info">
        <div className="profile-info__inner">
          <div className="profile-info__box">
            <label
              className={`profile-info__edit-btn${
                isMyProfile ? " pointer" : ""
              }`}
              htmlFor="uploadImg"
            >
              <div className="profile-info__img">
                {avatar ? <img src={avatar} alt="account" /> : <EmptySvg />}
              </div>
              {isMyProfile && (
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
                <h1 className="profile-info__title SFPro-700">{user.name}</h1>
              )}
              <span
                className={`profile-info__subtitle${!country ? " empty" : ""}`}
              >
                {country || translate("profilePage.country")}
              </span>
              {nickname && (
                <span className="profile-info__name SFPro-700">
                  @{nickname}
                </span>
              )}
            </div>
          </div>
          <span
            className={`profile-info__span${bio.length === 0 ? " empty" : ""}`}
          >
            {isMyProfile
              ? translate("profilePage.aboutMe")
              : translate("profilePage.about")}
          </span>
          <p
            className={`profile-info__text${bio.length === 0 ? " empty" : ""}`}
          >
            {bio.length !== 0 ? bio : translate("profilePage.emptyBio")}
          </p>
          {!!facebook ||
            !!twitter ||
            !!instagram ||
            (!!website && (
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
                        {host.length > 20
                          ? `${host.substring(0, 21)}...`
                          : host}
                      </span>
                    </a>
                  </li>
                )}
              </ul>
            ))}
        </div>
        {isMyProfile && (
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
