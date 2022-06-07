import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { checklistAPI } from "../../../services/checklistService";
import EditProfileInput from "./EditProfileLabel/EditProfileLabel";
import EditProfileDropdown from "./EditProfileDropdown/EditProfileDropdown";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import useClickOutside from "../../../hooks/useClickOutside";
import validateLink from "../../../utils/validateLink";
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
  const [isLinksInValid, setIsLinksInValid] = useState({
    website: true,
    facebook: true,
    instagram: true,
    twitter: true,
  });
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
    const invalidLinks = {
      website: true,
      facebook: true,
      instagram: true,
      twitter: true,
    };
    error.data.message.forEach((item) => {
      if (item.attribute === "nickname" && item.type === "too_short") {
        setIsNicknameServerValid({ short: true });
      } else if (item.attribute === "nickname" && item.type === "taken") {
        setIsNicknameServerValid({ taken: true });
      } else if (item.attribute === "site") {
        invalidLinks.website = false;
      } else if (item.attribute === "facebook") {
        invalidLinks.facebook = false;
      } else if (item.attribute === "instagram") {
        invalidLinks.instagram = false;
      } else if (item.attribute === "twitter") {
        invalidLinks.twitter = false;
      }
    });

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
    const website = websiteValue ? validateLink(websiteValue) : true;
    const facebook = facebookValue ? validateLink(facebookValue) : true;
    const instagram = instagramValue ? validateLink(instagramValue) : true;
    const twitter = twitterValue ? validateLink(twitterValue) : true;
    const links = {
      website,
      facebook,
      instagram,
      twitter,
    };
    setIsLinksInValid(links);

    if (
      name &&
      nickname &&
      bio &&
      website &&
      facebook &&
      instagram &&
      twitter
    ) {
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
            <EditProfileInput
              isInvalid={{ isNickNameValid, isNicknameServerValid }}
              invalidText={{
                maxNickname: translate("editProfilePage.maxNickname"),
                nickNicknameTaken: translate(
                  "editProfilePage.nickNicknameTaken"
                ),
                minNickname: translate("editProfilePage.minNickname"),
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
