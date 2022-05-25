/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../../../services/checklistService";
import useClickOutside from "../../../hooks/useClickOutside";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./EditProfile.scss";

import { ReactComponent as ArrowSvg } from "../../../assets/images/icon/rightArrow.svg";
import { ReactComponent as EditProfileSvg } from "../../../assets/images/content/editProfile.svg";

const EditProfile = () => {
  const [nameValid, setNameValid] = useState(true);
  const [nickNameValid, setNickNameValid] = useState(true);
  const [bioValid, setBioValid] = useState(true);
  const [country, setCountry] = useState("Select a country");
  const nameRef = useRef();
  const nickNameRef = useRef();
  const bioRef = useRef();
  const websiteRef = useRef();
  const facebookRef = useRef();
  const instagramRef = useRef();
  const twitterRef = useRef();
  const { t: translate } = useTranslation();
  const { ref, show, setShowHandler } = useClickOutside();

  const [editAccount] = checklistAPI.useEditAccountMutation();
  const { data: countryNames } = checklistAPI.useFetchCountryNamesQuery("", {
    skip: !show,
  });

  const breadcrumbs = [
    { title: translate("profilePage.myProfile"), link: "/my-profile" },
    { title: translate("editProfilePage.editProfile") },
  ];

  const onChangeNameHandler = () => {
    const name =
      nameRef.current.value.length < 150 &&
      nameRef.current.value.trim().length > 0;
    setNameValid(name);

    return name;
  };

  const onChangeNickNameHandler = () => {
    const nickName =
      nickNameRef.current.value.length < 150 &&
      nickNameRef.current.value.trim().length > 0;
    setNickNameValid(nickName);

    return nickName;
  };

  const onChangeBioHandler = () => {
    const bio =
      bioRef.current.value.length < 150 &&
      bioRef.current.value.trim().length > 0;
    setBioValid(bio);

    return bio;
  };

  const onSelectCountryHandler = (name) => {
    setCountry(name);
    setShowHandler();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const name = onChangeNameHandler();
    const nickname = onChangeNickNameHandler();
    const bio = onChangeBioHandler();

    if (name && nickname && bio) {
      editAccount({
        name: nameRef.current.value,
        nickname: nickNameRef.current.value,
        bio: bioRef.current.value,
        site: websiteRef.current.value,
        facebook: facebookRef.current.value,
        instagram: instagramRef.current.value,
        twitter: twitterRef.current.value,
        country,
      });
    }
  };

  return (
    <div className="edit-profile container">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="edit-profile__wrapper">
        <form
          onSubmit={(e) => onSubmitHandler(e)}
          className="edit-profile__form"
        >
          <label
            className={`edit-profile__label${!nameValid ? " invalid" : ""}`}
          >
            <span className="edit-profile__title edit-profile__title--one SFPro-700">
              {translate("editProfilePage.name")}
            </span>
            <span className="edit-profile__subtitle">
              {translate("editProfilePage.max")}
            </span>
            <input onChange={onChangeNameHandler} ref={nameRef} type="text" />
          </label>
          <label
            className={`edit-profile__label${!nickNameValid ? " invalid" : ""}`}
          >
            <span className="edit-profile__title edit-profile__title--two SFPro-700">
              {translate("editProfilePage.nickName")}
            </span>
            <span className="edit-profile__subtitle">
              {translate("editProfilePage.max")}
            </span>
            <input
              onChange={onChangeNickNameHandler}
              ref={nickNameRef}
              type="text"
            />
          </label>
          <div className="edit-profile__label">
            <span className="edit-profile__title SFPro-700">
              {translate("editProfilePage.country")}
            </span>
            <div className="edit-profile__wrap" ref={ref}>
              <button
                onClick={setShowHandler}
                className={`edit-profile__button SFPro-500${
                  show ? " active" : ""
                }`}
                type="button"
              >
                {country}
                <ArrowSvg />
              </button>
              {show && (
                <ul className="edit-profile__list">
                  {!countryNames ? (
                    countryNames.contries.map((item) => (
                      <li key={item} className="edit-profile__item">
                        <button
                          onClick={() => onSelectCountryHandler(item)}
                          className="edit-profile__btn"
                          type="button"
                        >
                          {item}
                        </button>
                      </li>
                    ))
                  ) : (
                    <>
                      <div className="loading-list__skeleton" />
                      <div className="loading-list__skeleton" />
                      <div className="loading-list__skeleton" />
                      <div className="loading-list__skeleton" />
                      <div className="loading-list__skeleton" />
                    </>
                  )}
                </ul>
              )}
            </div>
          </div>
          <label
            className={`edit-profile__label${!bioValid ? " invalid" : ""}`}
          >
            <span className="edit-profile__title SFPro-700">
              {translate("editProfilePage.bio")}
            </span>
            <span className="edit-profile__subtitle">
              {translate("editProfilePage.bioMax")}
            </span>
            <textarea onChange={onChangeBioHandler} ref={bioRef} />
          </label>
          <label className="edit-profile__label">
            <span className="edit-profile__title SFPro-700">
              {translate("editProfilePage.website")}
            </span>
            <input ref={websiteRef} type="text" />
          </label>
          <label className="edit-profile__label">
            <span className="edit-profile__title SFPro-700">
              {translate("editProfilePage.facebook")}
            </span>
            <input ref={facebookRef} type="text" />
          </label>
          <label className="edit-profile__label">
            <span className="edit-profile__title SFPro-700">
              {translate("editProfilePage.instagram")}
            </span>
            <input ref={instagramRef} type="text" />
          </label>
          <label className="edit-profile__label">
            <span className="edit-profile__title SFPro-700">
              {translate("editProfilePage.twitter")}
            </span>
            <input ref={twitterRef} type="text" />
          </label>
          <button className="edit-profile__submit SFPro-600" type="submit">
            {translate("editProfilePage.button")}
          </button>
        </form>
        <div className="edit-profile__svg">
          <EditProfileSvg />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
