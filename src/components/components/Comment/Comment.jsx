import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditDropdown from "../EditDropdown/EditDropdown";
import "./Comment.scss";

import { ReactComponent as LikeSvg } from "../../../assets/images/icon/like.svg";

const Comment = ({
  date,
  author,
  commentID,
  text,
  liked,
  unliked,
  onLikeHandler,
  onUnlikeHandler,
  onDeleteHandler,
}) => {
  const user = useSelector((state) => state.authSliceReducer.user);
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
          <span className="checklist-comment__heading SFPro-600">{author}</span>
          <span className="checklist-comment__time">{date}</span>
        </div>
        <p className="checklist-comment__text">{text}</p>
        <div className="checklist-comment__buttons">
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
      </div>
      {user && user.nickname === author && (
        <EditDropdown
          commentID={commentID}
          onDeleteHandler={onDeleteHandler}
          componentType="comment"
        />
      )}
    </li>
  );
};

export default Comment;
