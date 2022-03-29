import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import getTime from "../../../utils/getTime";
import uniqueID from "../../../utils/uniqueID";
import "./ChecklistComments.scss";

import { ReactComponent as ArrowSvg } from "../../../assets/images/icon/rightArrow.svg";
import Comment from "../Comment/Comment";

const ChecklistComments = ({ comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [data, setData] = useState(comments.slice(0, 3));
  const { t: translate } = useTranslation();

  const showCommentHandler = () => {
    setShowComments(true);
    setData(comments);
  };

  return (
    <div className="checklist-comments">
      <span className="checklist-comments__review SFPro-600">
        {comments.length} Reviews
      </span>
      <form className="checklist-comments__form">
        <label className="checklist-comments__label" htmlFor="checklistReview">
          <input
            className="checklist-comments__input"
            id="checklistReview"
            type="text"
            placeholder="Leave a comment..."
          />
        </label>
      </form>
      <ul className="checklist-comments__items">
        {data.map((comment) => {
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
