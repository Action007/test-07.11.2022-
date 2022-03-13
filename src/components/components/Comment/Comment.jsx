import React, { useState } from "react";
import "./Comment.scss";

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
    <li className="checklist-comment">
      <div className="checklist-comment__heading">
        <span className="checklist-comment__heading SFPro-600">{nickname}</span>
        <span className="checklist-comment__time">{date}</span>
      </div>
      <p className="checklist-comment__text">{message}</p>
      <button
        onClick={setLikeHandler}
        className={`${`checklist-comment__likes SFPro-700`}${
          likes ? " active" : ""
        }${like ? " liked" : ""}`}
        type="button"
      >
        <LikeSvg />
        {like ? likes + 1 : likes}
      </button>
      <button
        onClick={setDislikeHandler}
        className={`${`checklist-comment__dislikes SFPro-700`}${
          dislikes ? " active" : ""
        }${dislike ? " disliked" : ""}`}
        type="button"
      >
        <LikeSvg />
        {dislike ? dislikes + 1 : dislikes}
      </button>
    </li>
  );
};

export default Comment;
