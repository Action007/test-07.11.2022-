import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import uniqueID from "../../../utils/uniqueId";
import getTime from "../../../utils/getTime";
import "./ChecklistReview.scss";

import { ReactComponent as LikeSvg } from "../../../assets/images/icon/like.svg";
import { ReactComponent as ArrowSvg } from "../../../assets/images/icon/rightArrow.svg";

const ChecklistReview = ({ comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [data, setData] = useState(comments.slice(0, 3));
  const { t: translate } = useTranslation();

  const showCommentHandler = () => {
    setShowComments(true);
    setData(comments);
  };

  const items = data.map((comment) => {
    const { date } = getTime(comment.user.created_at);
    return (
      <li key={uniqueID()} className="checklist-review__item">
        <div className="checklist-review__heading">
          <span className="checklist-review__heading SFPro-600">
            {comment.user.nickname}
          </span>
          <span className="checklist-review__time">{date}</span>
        </div>
        <p className="checklist-review__text">{comment.message}</p>
        <button
          className={`${`checklist-review__likes SFPro-700`} ${
            comment.likes ? "active" : ""
          }`}
          type="button"
        >
          <LikeSvg />
          {comment.likes}
        </button>
        <button
          className={`${`checklist-review__dislikes SFPro-700`} ${
            comment.likes ? "active" : ""
          }`}
          type="button"
        >
          <LikeSvg />
          {comment.dislikes}
        </button>
      </li>
    );
  });

  return (
    <div className="checklist-review">
      <span className="checklist-review__review SFPro-600">
        {comments.length} Reviews
      </span>
      <form className="checklist-review__form">
        <label className="checklist-review__label" htmlFor="checklistReview">
          <input
            className="checklist-review__input"
            id="checklistReview"
            type="text"
            placeholder="Leave a comment..."
          />
        </label>
      </form>
      <ul className="checklist-review__items">{items}</ul>
      {!showComments && (
        <button
          onClick={showCommentHandler}
          className="checklist-review__button SFPro-500"
          type="button"
        >
          <ArrowSvg />
          {translate("checklistDetailPage.moreComments")}
        </button>
      )}
    </div>
  );
};

export default ChecklistReview;
