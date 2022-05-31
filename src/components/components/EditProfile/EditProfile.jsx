/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { checklistAPI } from "../../../services/checklistService";
import EditProfileInput from "./EditProfileInput";
import EditProfileDropdown from "./EditProfileDropdown";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import useClickOutside from "../../../hooks/useClickOutside";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./EditProfile.scss";

import { ReactComponent as EditProfileSvg } from "../../../assets/images/content/editProfile.svg";

const EditProfile = () => {
  const user = useSelector((state) => state.authSliceReducer.user);
  const [nameValue, setNameValue] = useState("");
  const [nickNameValue, setNickNameValue] = useState("");
  const [bioValue, setBioValue] = useState("");
  const [websiteValue, setWebsiteValue] = useState("");
  const [facebookValue, setFacebookValue] = useState("");
  const [instagramValue, setInstagramValue] = useState("");
  const [twitterValue, setTwitterValue] = useState("");
  const [country, setCountry] = useState("Select a country");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNickNameValid, setIsNickNameValid] = useState(true);
  const [isBioValid, setIsBioValid] = useState(true);
  const [isNicknameServerValid, setIsNicknameServerValid] = useState(null);
  const [isLinkInValid, setIsLinkInValid] = useState(null);
  const { ref, show, setShowHandler } = useClickOutside();
  const [editAccount, { isLoading: isUpdateLoading, error }] =
    checklistAPI.useEditAccountMutation();
  const { data: countryNames, isLoading } =
    checklistAPI.useFetchCountryNamesQuery("", {
      skip: !show,
    });
  const { t: translate } = useTranslation();
  const breadcrumbs = [
    { title: translate("profilePage.myProfile"), link: "/my-profile" },
    { title: translate("editProfilePage.editProfile") },
  ];

  useEffect(() => {
    if (!error) return;
    const invalidLinks = {};
    error.data.message.forEach((item) => {
      if (item.attribute === "nickname" && item.type === "too_short") {
        setIsNicknameServerValid({ short: true });
      } else if (item.attribute === "nickname" && item.type === "taken") {
        setIsNicknameServerValid({ taken: true });
      } else if (item.attribute === "site") {
        invalidLinks.website = true;
      } else if (item.attribute === "facebook") {
        invalidLinks.facebook = true;
      } else if (item.attribute === "instagram") {
        invalidLinks.instagram = true;
      } else if (item.attribute === "twitter") {
        invalidLinks.twitter = true;
      }
    });

    setIsLinkInValid(invalidLinks);
  }, [error]);

  useEffect(() => {
    if (!user) return;
    setNameValue(user.name || "");
    setNickNameValue(user.nickname || "");
    setBioValue(user.bio || "");
    setWebsiteValue(user.site || "");
    setFacebookValue(user.facebook || "");
    setInstagramValue(user.instagram || "");
    setTwitterValue(user.twitter || "");
    setCountry(user.country || "Select a country");
  }, [user]);

  const onChangeNameHandler = (value) => {
    const name = value.length < 151 && value.trim().length > 0;
    setNameValue(value);
    setIsNameValid(name);

    return name;
  };

  const onChangeNickNameHandler = (value) => {
    const nickName = value.length < 51 && value.trim().length > 0;
    setNickNameValue(value);
    setIsNickNameValid(nickName);
    setIsNicknameServerValid(null);

    return nickName;
  };

  const onChangeBioHandler = (value) => {
    const bio = value.length < 151 && value.trim().length > 0;
    setBioValue(value);
    setIsBioValid(bio);

    return bio;
  };

  const onSelectCountryHandler = (name) => {
    setCountry(name);
    setShowHandler();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const name = onChangeNameHandler(nameValue);
    const nickname = onChangeNickNameHandler(nickNameValue);
    const bio = onChangeBioHandler(bioValue);

    if (name && nickname && bio) {
      editAccount({
        name: nameValue,
        nickname: nickNameValue,
        bio: bioValue,
        site: websiteValue,
        facebook: facebookValue,
        instagram: instagramValue,
        twitter: twitterValue,
        country: country === "Select a country" ? "" : country,
      });
    }
  };

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isUpdateLoading} />
      <div className="edit-profile container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="edit-profile__wrapper">
          <form
            onSubmit={(e) => onSubmitHandler(e)}
            className="edit-profile__form"
          >
            <EditProfileInput
              isInvalid={!isNameValid}
              invalidText={translate("editProfilePage.max")}
              title={translate("editProfilePage.name")}
              setValue={onChangeNameHandler}
              value={nameValue}
            />
            <label
              className={`edit-profile__label${
                !isNickNameValid || isNicknameServerValid ? " invalid" : ""
              }`}
            >
              <span className="edit-profile__title edit-profile__title--two SFPro-700">
                {translate("editProfilePage.nickName")}
              </span>
              <span className="edit-profile__subtitle">
                {!isNickNameValid && translate("editProfilePage.maxNickname")}
                {isNicknameServerValid?.taken &&
                  translate("editProfilePage.nickNicknameTaken")}
                {isNicknameServerValid?.short &&
                  translate("editProfilePage.minNickname")}
              </span>
              <input
                onChange={(e) => onChangeNickNameHandler(e.target.value)}
                value={nickNameValue}
                minLength="2"
                type="text"
              />
            </label>
            <div className="edit-profile__label">
              <span className="edit-profile__title SFPro-700">
                {translate("editProfilePage.country")}
              </span>
              <EditProfileDropdown
                dropdownRef={ref}
                setShowHandler={setShowHandler}
                show={show}
                country={country}
                countryNames={countryNames}
                onSelectCountryHandler={onSelectCountryHandler}
                isLoading={isLoading}
              />
            </div>
            <EditProfileInput
              isInvalid={!isBioValid}
              invalidText={translate("editProfilePage.bioMax")}
              title={translate("editProfilePage.bio")}
              setValue={onChangeBioHandler}
              value={bioValue}
            />
            <EditProfileInput
              isInvalid={isLinkInValid?.website}
              invalidText={translate("editProfilePage.isLinkValid")}
              title={translate("editProfilePage.website")}
              setValue={setWebsiteValue}
              value={websiteValue}
            />
            <EditProfileInput
              isInvalid={isLinkInValid?.facebook}
              invalidText={translate("editProfilePage.isLinkValid")}
              title={translate("editProfilePage.facebook")}
              setValue={setFacebookValue}
              value={facebookValue}
            />
            <EditProfileInput
              isInvalid={isLinkInValid?.instagram}
              invalidText={translate("editProfilePage.isLinkValid")}
              title={translate("editProfilePage.instagram")}
              setValue={setInstagramValue}
              value={instagramValue}
            />
            <EditProfileInput
              isInvalid={isLinkInValid?.twitter}
              invalidText={translate("editProfilePage.isLinkValid")}
              title={translate("editProfilePage.twitter")}
              setValue={setTwitterValue}
              value={twitterValue}
            />
            <button className="edit-profile__submit SFPro-600" type="submit">
              {translate("editProfilePage.button")}
            </button>
          </form>
          <div className="edit-profile__svg">
            <EditProfileSvg />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
