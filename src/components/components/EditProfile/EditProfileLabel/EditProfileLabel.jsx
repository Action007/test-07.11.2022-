import React from "react";
import uniqueID from "../../../../utils/uniqueID";
import "./EditProfileLabel.scss";

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
      ? !isInvalid.isNickNameValid ||
        isInvalid.isNicknameServerValid ||
        isInvalid.isNicknameInvalidCharacters
      : isInvalid;
  const labelID = uniqueID();

  return (
    <label
      className={`profile-label${invalid ? " invalid" : ""}`}
      htmlFor={labelID}
    >
      <span className="profile-label__title SFPro-700">{title}</span>
      {inputType === "nickname" ? (
        <>
          <span className="profile-label__subtitle">
            {!isInvalid.isNickNameValid && invalidText.maxNickname}
            {isInvalid.isNicknameServerValid?.taken &&
              invalidText.nickNicknameTaken}
            {isInvalid.isNicknameServerValid?.short && invalidText.minNickname}
            {isInvalid.isNicknameInvalidCharacters &&
              invalidText.nicknameInvalidCharacters}
          </span>
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type="text"
            id={labelID}
          />
        </>
      ) : (
        <>
          {isInvalid && (
            <span className="profile-label__subtitle">{invalidText}</span>
          )}
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type="text"
            id={labelID}
          />
        </>
      )}
    </label>
  );
};

export default EditProfileInput;
