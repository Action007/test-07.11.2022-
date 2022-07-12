import React from "react";
import "./EditProfileDropdown.scss";

import { ReactComponent as ArrowSvg } from "../../../../assets/images/icon/rightArrow.svg";

const EditProfileDropdown = ({
  dropdownRef,
  setShowHandler,
  show,
  country,
  countryNames,
  onSelectCountryHandler,
  isLoading,
}) => {
  const ChecklistSkeletons = (
    <>
      <li className="profile-dropdown__skeleton" />
      <li className="profile-dropdown__skeleton" />
      <li className="profile-dropdown__skeleton" />
      <li className="profile-dropdown__skeleton" />
      <li className="profile-dropdown__skeleton" />
      <li className="profile-dropdown__skeleton" />
    </>
  );

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button
        onClick={setShowHandler}
        className={`profile-dropdown__button SFPro-500${show ? " active" : ""}`}
        type="button"
      >
        {country}
        <ArrowSvg />
      </button>
      {show && (
        <ul className="profile-dropdown__list">
          {countryNames &&
            countryNames.contries.map((item) => (
              <li key={item} className="profile-dropdown__item">
                <button
                  onClick={() => onSelectCountryHandler(item)}
                  className="profile-dropdown__btn"
                  type="button"
                >
                  {item}
                </button>
              </li>
            ))}
          {isLoading && ChecklistSkeletons}
        </ul>
      )}
    </div>
  );
};

export default EditProfileDropdown;
