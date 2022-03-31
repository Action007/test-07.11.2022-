/* eslint-disable no-shadow */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import getTime from "../../../utils/getTime";
import uniqueID from "../../../utils/uniqueID";
import "./ChecklistComments.scss";

import { ReactComponent as ArrowSvg } from "../../../assets/images/icon/rightArrow.svg";
import Comment from "../Comment/Comment";

const ChecklistComments = ({ comments }) => {
  const [value, setValue] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [data, setData] = useState(comments);
  const [num, setNum] = useState(3);
  const { t: translate } = useTranslation();

  const showCommentHandler = () => {
    setShowComments(true);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (value.trim().length === 0) return;
    const items = [
      ...data,
      {
        message: value,
        likes: 0,
        dislikes: 0,
        user: {
          created_at: new Date(),
          id: 5,
          nickname: "Alex64",
        },
      },
    ];

    setData(
      [...items].sort((a, b) => {
        const c = new Date(a.user.created_at);
        const d = new Date(b.user.created_at);
        return d - c;
      })
    );
    setNum((prevNum) => prevNum + 1);
    setValue("");
  };

  return (
    <div className="checklist-comments">
      <span className="checklist-comments__review SFPro-600">
        {comments.length} Reviews
      </span>
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className="checklist-comments__form"
      >
        <label className="checklist-comments__label" htmlFor="checklistReview">
          <input
            onChange={(e) => setValue(e.target.value)}
            className="checklist-comments__input"
            value={value}
            id="checklistReview"
            type="text"
            placeholder="Leave a comment..."
          />
        </label>
      </form>
      <ul className="checklist-comments__items">
        {showComments &&
          data.map((comment) => {
            const { date } = getTime(comment.user.created_at);
            return (
              <Comment
                key={uniqueID()}
                date={date}
                nickname={comment.user.nickname}
                message={comment.message}
                likes={comment.likes}
                dislikes={comment.dislikes}
              />
            );
          })}
        {!showComments &&
          data.slice(0, num).map((comment) => {
            const { date } = getTime(comment.user.created_at);
            return (
              <Comment
                key={uniqueID()}
                date={date}
                nickname={comment.user.nickname}
                message={comment.message}
                likes={comment.likes}
                dislikes={comment.dislikes}
              />
            );
          })}
      </ul>
      {!showComments && (
        <button
          onClick={showCommentHandler}
          className="checklist-comments__button SFPro-500"
          type="button"
        >
          <ArrowSvg />
          {translate("checklistReviewPage.moreComments")}
        </button>
      )}
    </div>
  );
};

export default ChecklistComments;
