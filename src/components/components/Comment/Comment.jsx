import React, { useState } from "react";

import { ReactComponent as LikeSvg } from "../../../assets/images/icon/like.svg";

const Comment = ({ date, nickname, message, likes, dislikes }) => {
  const [like, setLiked] = useState(false);
  const [dislike, setDisliked] = useState(false);

  const setLikeHandler = () => {
    setLiked((prevState) => !prevState);
    setDisliked(false);
  };

  const setDislikeHandler = () => {
    setDisliked((prevState) => !prevState);
    setLiked(false);
  };

  return (
    <li className="checklist-review__item">
      <div className="checklist-review__heading">
        <span className="checklist-review__heading SFPro-600">{nickname}</span>
        <span className="checklist-review__time">{date}</span>
      </div>
      <p className="checklist-review__text">{message}</p>
      <button
        onClick={setLikeHandler}
        className={`${`checklist-review__likes SFPro-700`}${
          likes ? " active" : ""
        }${like ? " liked" : ""}`}
        type="button"
      >
        <LikeSvg />
        {likes}
      </button>
      <button
        onClick={setDislikeHandler}
        className={`${`checklist-review__dislikes SFPro-700`}${
          dislikes ? " active" : ""
        }${dislike ? " disliked" : ""}`}
        type="button"
      >
        <LikeSvg />
        {dislikes}
      </button>
    </li>
  );
};

export default Comment;
