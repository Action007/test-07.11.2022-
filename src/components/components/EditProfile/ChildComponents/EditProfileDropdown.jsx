import React from "react";

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
  const loadingSkeletons = (
    <>
      <li className="edit-profile__skeleton" />
      <li className="edit-profile__skeleton" />
      <li className="edit-profile__skeleton" />
      <li className="edit-profile__skeleton" />
      <li className="edit-profile__skeleton" />
      <li className="edit-profile__skeleton" />
    </>
  );

  return (
    <div className="edit-profile__wrap" ref={dropdownRef}>
      <button
        onClick={setShowHandler}
        className={`edit-profile__button SFPro-500${show ? " active" : ""}`}
        type="button"
      >
        {country}
        <ArrowSvg />
      </button>
      {show && (
        <ul className="edit-profile__list">
          {countryNames &&
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
            ))}
          {isLoading && loadingSkeletons}
        </ul>
      )}
    </div>
  );
};

export default EditProfileDropdown;
