import React, { useRef, useState } from "react";
import "./SearchInput.scss";

const SearchInput = ({ searchHandler }) => {
  const [blur, setBlur] = useState(false);
  const searchRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const value = searchRef.current.value.trim();
    searchHandler(value);
  };

  return (
    <form onSubmit={(e) => onSubmitHandler(e)} className="search-input">
      <label
        className={`${`search-input__label`}${blur ? " active" : ""}`}
        htmlFor="search-input"
      >
        <input
          onFocus={() => setBlur((prevState) => !prevState)}
          onBlur={() => setBlur((prevState) => !prevState)}
          ref={searchRef}
          className="search-input__input border-0"
          placeholder="Enter a word or #tag"
          type="text"
        />
      </label>
    </form>
  );
};

export default SearchInput;
