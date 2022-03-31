/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./EditProfile.scss";

import { ReactComponent as EditProfileSvg } from "../../../assets/images/content/editProfile.svg";

const EditProfile = () => {
  const { t: translate } = useTranslation();
  const nameRef = useRef();
  const nickNameRef = useRef();
  const locationRef = useRef();
  const bioRef = useRef();
  const websiteRef = useRef();
  const facebookRef = useRef();
  const instagramRef = useRef();
  const twitterRef = useRef();
  const [nameValid, setNameValid] = useState(true);
  const [nickNameValid, setNickNameValid] = useState(true);
  const [bioValid, setBioValid] = useState(true);

  const breadcrumbs = [
    { title: translate("profilePage.myProfile"), link: "/my-profile" },
    { title: translate("editProfilePage.editProfile") },
  ];

  const onChangeNameHandler = () => {
    const name =
      nameRef.current.value.length < 150 &&
      nameRef.current.value.trim().length > 0;

    setNameValid(name);
  };

  const onChangeNickNameHandler = () => {
    const nickName =
      nickNameRef.current.value.length < 150 &&
      nickNameRef.current.value.trim().length > 0;

    setNickNameValid(nickName);
  };

  const onChangeBioHandler = () => {
    const bio =
      bioRef.current.value.length < 150 &&
      bioRef.current.value.trim().length > 0;

    setBioValid(bio);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onChangeNameHandler();
    onChangeNickNameHandler();
    onChangeBioHandler();

    const name =
      nameRef.current.value.length < 150 &&
      nameRef.current.value.trim().length > 0;
    const nickName =
      nickNameRef.current.value.length < 150 &&
      nickNameRef.current.value.trim().length > 0;
    const bio =
      bioRef.current.value.length < 150 &&
      bioRef.current.value.trim().length > 0;

    if (name && nickName && bio) {
      console.log("sd2");
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
          <label className="edit-profile__label">
            <span className="edit-profile__title SFPro-700">
              {translate("editProfilePage.location")}
            </span>
            <input ref={locationRef} type="text" />
          </label>
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
