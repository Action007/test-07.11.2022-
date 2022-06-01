/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

const EditProfileInput = ({
  isInvalid,
  invalidText,
  title,
  setValue,
  value,
  inputType,
}) => {
  const invalid =
    inputType === "nickname"
      ? !isInvalid.isNickNameValid || isInvalid.isNicknameServerValid
      : isInvalid;

  return (
    <label className={`edit-profile__label${invalid ? " invalid" : ""}`}>
      <span className="edit-profile__title SFPro-700">{title}</span>
      {inputType === "nickname" ? (
        <>
          <span className="edit-profile__subtitle">
            {!isInvalid.isNickNameValid && invalidText.maxNickname}
            {isInvalid.isNicknameServerValid?.taken &&
              invalidText.nickNicknameTaken}
            {isInvalid.isNicknameServerValid?.short && invalidText.minNickname}
          </span>
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            minLength="2"
            type="text"
          />
        </>
      ) : (
        <>
          {isInvalid && (
            <span className="edit-profile__subtitle">{invalidText}</span>
          )}
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type="text"
          />
        </>
      )}
    </label>
  );
};

export default EditProfileInput;
