/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

const EditProfileInput = ({
  isInvalid,
  invalidText,
  title,
  setValue,
  value,
}) => {
  return (
    <label className={`edit-profile__label${isInvalid ? " invalid" : ""}`}>
      <span className="edit-profile__title SFPro-700">{title}</span>
      {isInvalid && (
        <span className="edit-profile__subtitle">{invalidText}</span>
      )}
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type="text"
      />
    </label>
  );
};

export default EditProfileInput;
