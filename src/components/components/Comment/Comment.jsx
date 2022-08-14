import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  userTrack,
}) => {
  const user = useSelector((state) => state.authSliceReducer.user);
  const [like, setLiked] = useState(!!userTrack?.liked);
  const [dislike, setDisliked] = useState(!!userTrack?.unliked);
  const likeAmount = like ? liked + 1 : liked;
  const dislikeAmount = dislike ? unliked + 1 : unliked;
  const finalLikeAmount = userTrack?.liked ? likeAmount - 1 : likeAmount;
  const finalDislikeAmount = userTrack?.unliked
    ? dislikeAmount - 1
    : dislikeAmount;
  const likeClass = `${`checklist-comment__likes SFPro-700`}${
    liked && finalLikeAmount ? " liked" : ""
  }${like ? " active" : ""}`;
  const dislikeClass = `${`checklist-comment__dislikes SFPro-700`}${
    unliked && finalDislikeAmount ? " disliked" : ""
  }${dislike ? " active" : ""}`;
  const navigate = useNavigate();

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

  const onClickHandler = () => {
    navigate(`/${author}`);
  };

  return (
    <li className="checklist-comment">
      <div className="checklist-comment__wrapper">
        <h3 className="checklist-comment__heading">
          <button
            onClick={onClickHandler}
            className="checklist-comment__title SFPro-600"
            type="button"
          >
            {author}
          </button>
          <span className="checklist-comment__time">{date}</span>
        </h3>
        <p className="checklist-comment__text">{text}</p>
        <div className="checklist-comment__buttons">
          <button onClick={setLikeHandler} className={likeClass} type="button">
            <LikeSvg />
            {finalLikeAmount}
          </button>
          <button
            onClick={setDislikeHandler}
            className={dislikeClass}
            type="button"
          >
            <LikeSvg />
            {finalDislikeAmount}
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
