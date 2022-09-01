import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  useEditAccountMutation,
  useFetchCountryNamesQuery,
} from "../../../services/accountService";
import EditProfileInput from "./EditProfileLabel/EditProfileLabel";
import EditProfileDropdown from "./EditProfileDropdown/EditProfileDropdown";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import useClickOutside from "../../../hooks/useClickOutside";
import validateLink from "../../../utils/validateLink";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Notification from "../../UI/Notification/Notification";
import "./EditProfile.scss";

import audio from "../../../assets/sound/song.mp3";
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
  const [linkedinValue, setLinkedinValue] = useState("");
  const [notification, setNotification] = useState(false);
  const [country, setCountry] = useState("Select a country");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNickNameValid, setIsNickNameValid] = useState(true);
  const [isNicknameInvalidCharacters, setIsNicknameInvalidCharacters] =
    useState(false);
  const [isBioValid, setIsBioValid] = useState(true);
  const [isNicknameServerValid, setIsNicknameServerValid] = useState(null);
  const [isLinksInValid, setIsLinksInValid] = useState({
    website: true,
    facebook: true,
    instagram: true,
    twitter: true,
    linkedin: true,
  });
  const { ref, show, setShowHandler } = useClickOutside();
  const [
    editAccount,
    {
      isSuccess: isEditSuccess,
      isLoading: isUpdateLoading,
      isError: isEditError,
      error,
    },
  ] = useEditAccountMutation();
  const { data: countryNames, isLoading } = useFetchCountryNamesQuery("", {
    skip: !show,
  });
  const { t: translate } = useTranslation();

  const breadcrumbs = [
    {
      title: user?.nickname,
      link: `/${user?.nickname}`,
    },
    { title: translate("editProfilePage.editProfile") },
  ];
  const song = new Audio(audio);
  song.volume = 0.1;

  useEffect(() => {
    if (!error?.data?.message) return;
    const invalidLinks = {
      website: true,
      facebook: true,
      instagram: true,
      twitter: true,
      linkedin: true,
    };
    const errorMessage = error.data.message[0];

    if (
      errorMessage.attribute === "nickname" &&
      errorMessage.type === "too_short"
    ) {
      setIsNicknameServerValid({ short: true });
    } else if (
      errorMessage.attribute === "nickname" &&
      errorMessage.type === "taken"
    ) {
      setIsNicknameServerValid({ taken: true });
    } else if (
      errorMessage.attribute === "nickname" &&
      errorMessage.type === "invalid_characters"
    ) {
      setIsNicknameInvalidCharacters(true);
    } else if (errorMessage.attribute === "site") {
      invalidLinks.website = false;
    } else if (errorMessage.attribute === "facebook") {
      invalidLinks.facebook = false;
    } else if (errorMessage.attribute === "instagram") {
      invalidLinks.instagram = false;
    } else if (errorMessage.attribute === "twitter") {
      invalidLinks.twitter = false;
    } else if (errorMessage.attribute === "linkedin") {
      invalidLinks.linkedin = false;
    }
    setIsLinksInValid(invalidLinks);
  }, [error]);

  useEffect(() => {
    if (!user) return;
    setNameValue(user.name || "");
    setNickNameValue(user.nickname || "");
    setBioValue(user.bio || "");
    setCountry(user.country || "Select a country");
    setWebsiteValue(user.site || "");
    setFacebookValue(user.facebook || "");
    setInstagramValue(user.instagram || "");
    setTwitterValue(user.twitter || "");
    setLinkedinValue(user.linkedin || "");
  }, [user]);

  useEffect(() => {
    let showNotification;
    if (isEditSuccess || isEditError) {
      setNotification(true);
      if (isEditSuccess) song.play();
      showNotification = setTimeout(() => setNotification(false), 5000);
    }

    return () => {
      clearTimeout(showNotification);
    };
  }, [isEditSuccess, isEditError]);

  const onChangeNameHandler = (value) => {
    const name = value.length < 51 && value.trim().length > 1;
    setNameValue(value);
    setIsNameValid(name);

    return name;
  };

  const onChangeNickNameHandler = (value) => {
    const nickName = value.length < 51 && value.trim().length > 1;
    setNickNameValue(value);
    setIsNickNameValid(nickName);
    setIsNicknameInvalidCharacters(false);
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
    const website = websiteValue ? validateLink(websiteValue) : true;
    const facebook = facebookValue
      ? validateLink(facebookValue, "facebook")
      : true;
    const instagram = instagramValue
      ? validateLink(instagramValue, "instagram")
      : true;
    const twitter = twitterValue ? validateLink(twitterValue, "twitter") : true;
    const linkedin = linkedinValue
      ? validateLink(linkedinValue, "linkedin")
      : true;
    const links = {
      website,
      facebook,
      instagram,
      twitter,
      linkedin,
    };
    setIsLinksInValid(links);

    if (
      name &&
      nickname &&
      bio &&
      website &&
      facebook &&
      instagram &&
      twitter &&
      linkedin
    ) {
      editAccount({
        name: nameValue,
        nickname: nickNameValue,
        bio: bioValue,
        site: websiteValue,
        facebook: facebookValue,
        instagram: instagramValue,
        twitter: twitterValue,
        linkedin: linkedinValue,
        country: country === "Select a country" ? "" : country,
      });
    }
  };

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isUpdateLoading} />
      {isEditSuccess && notification && (
        <Notification translate={translate("notification.profileUpdate")} />
      )}
      <div
        className={`edit-profile container${
          isEditSuccess && notification ? " show-notification" : ""
        }`}
      >
        {user && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        <div className="edit-profile__wrapper">
          <form
            onSubmit={(e) => onSubmitHandler(e)}
            className="edit-profile__form"
          >
            <EditProfileInput
              isInvalid={!isNameValid}
              invalidText={translate("editProfilePage.maxNickname")}
              title={translate("editProfilePage.name")}
              setValue={onChangeNameHandler}
              value={nameValue}
            />
            <EditProfileInput
              isInvalid={{
                isNickNameValid,
                isNicknameServerValid,
                isNicknameInvalidCharacters,
              }}
              invalidText={{
                maxNickname: translate("editProfilePage.maxNickname"),
                nickNicknameTaken: translate(
                  "editProfilePage.nickNicknameTaken"
                ),
                minNickname: translate("editProfilePage.minNickname"),
                nicknameInvalidCharacters: translate(
                  "editProfilePage.nicknameInvalidCharacters"
                ),
              }}
              title={translate("editProfilePage.nickName")}
              setValue={onChangeNickNameHandler}
              value={nickNameValue}
              inputType="nickname"
            />
            <div className="edit-profile__inner">
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
              isInvalid={!isLinksInValid.website}
              invalidText={translate("editProfilePage.isLinkValid")}
              title={translate("editProfilePage.website")}
              setValue={setWebsiteValue}
              value={websiteValue}
            />
            <EditProfileInput
              isInvalid={!isLinksInValid.facebook}
              invalidText={translate("editProfilePage.isLinkValid")}
              title={translate("editProfilePage.facebook")}
              setValue={setFacebookValue}
              value={facebookValue}
            />
            <EditProfileInput
              isInvalid={!isLinksInValid.instagram}
              invalidText={translate("editProfilePage.isLinkValid")}
              title={translate("editProfilePage.instagram")}
              setValue={setInstagramValue}
              value={instagramValue}
            />
            <EditProfileInput
              isInvalid={!isLinksInValid.twitter}
              invalidText={translate("editProfilePage.isLinkValid")}
              title={translate("editProfilePage.twitter")}
              setValue={setTwitterValue}
              value={twitterValue}
            />
            <EditProfileInput
              isInvalid={!isLinksInValid.linkedin}
              invalidText={translate("editProfilePage.isLinkValid")}
              title={translate("editProfilePage.linkedin")}
              setValue={setLinkedinValue}
              value={linkedinValue}
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
