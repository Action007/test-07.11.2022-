import React, { useState } from "react";
import "./SearchInput.scss";

const SearchInput = () => {
  const [blur, setBlur] = useState(false);
  const onBlurHandler = () => setBlur((prevState) => !prevState);

  return (
    <form className="search-input">
      <label
        className={`${`search-input__label`}${blur ? " active" : ""}`}
        htmlFor="search-input"
      >
        <input
          onFocus={onBlurHandler}
          onBlur={onBlurHandler}
          className="search-input__input border-0"
          placeholder="How to set up a company in the USA"
          type="email"
        />
      </label>
    </form>
  );
};

export default SearchInput;
