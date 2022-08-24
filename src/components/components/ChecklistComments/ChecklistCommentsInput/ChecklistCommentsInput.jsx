import React, { useState } from "react";
import "./ChecklistCommentsInput.scss";

const ChecklistCommentsInput = ({ submitHandler, translate }) => {
  const [isValidComment, setIsValidComment] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setInputValue(value);
    if (value.trim().length > 150) {
      setIsValidComment(false);
    } else {
      setIsValidComment(true);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    submitHandler(inputValue, setInputValue, isValidComment);
  };

  return (
    <form onSubmit={onSubmitHandler} className="checklist-comments-form">
      <label
        className="checklist-comments-form__label"
        htmlFor="checklistReview"
      >
        {!isValidComment && (
          <span className="checklist-comments-form__desc">
            {translate("checklistReviewPage.max")}
          </span>
        )}
        <input
          onChange={onChangeHandler}
          className={`checklist-comments-form__input${
            !isValidComment ? " invalid" : ""
          }`}
          value={inputValue}
          id="checklistReview"
          type="text"
          placeholder="Leave a comment..."
        />
      </label>
    </form>
  );
};

export default ChecklistCommentsInput;
