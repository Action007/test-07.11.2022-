import React, { useState } from "react";
import "./Comment.scss";

import { ReactComponent as LikeSvg } from "../../../assets/images/icon/like.svg";
import EditDropdown from "../EditDropdown/EditDropdown";

const Comment = ({
  date,
  commentID,
  text,
  liked,
  unliked,
  onLikeHandler,
  onUnlikeHandler,
  onUpdateHandler,
  onDeleteHandler,
}) => {
  const [like, setLiked] = useState(false);
  const [dislike, setDisliked] = useState(false);

  const setLikeHandler = () => {
    setLiked((prevState) => !prevState);
    setDisliked(false);
    onLikeHandler(commentID);
  };

  const setDislikeHandler = () => {
    setDisliked((prevState) => !prevState);
    setLiked(false);
    onUnlikeHandler(commentID);
  };

  return (
    <li className="checklist-comment">
      <div className="checklist-comment__wrapper">
        <div className="checklist-comment__heading">
          {/* <span className="checklist-comment__heading SFPro-600">{nickname}</span> */}
          <span className="checklist-comment__time">{date}</span>
        </div>
        <p className="checklist-comment__text">{text}</p>
        <button
          onClick={setLikeHandler}
          className={`${`checklist-comment__likes SFPro-700`}${
            liked ? " active" : ""
          }${like ? " liked" : ""}`}
          type="button"
        >
          <LikeSvg />
          {like ? liked + 1 : liked}
        </button>
        <button
          onClick={setDislikeHandler}
          className={`${`checklist-comment__dislikes SFPro-700`}${
            unliked ? " active" : ""
          }${dislike ? " disliked" : ""}`}
          type="button"
        >
          <LikeSvg />
          {dislike ? unliked + 1 : unliked}
        </button>
      </div>
      <EditDropdown
        commentID={commentID}
        onUpdateHandler={onUpdateHandler}
        onDeleteHandler={onDeleteHandler}
      />
    </li>
  );
};

export default Comment;
