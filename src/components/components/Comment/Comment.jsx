import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import EditDropdown from "../EditDropdown/EditDropdown";
import "./Comment.scss";
import LikeDislikeViewButtons from "../LikeDislikeViewButtons/LikeDislikeViewButtons";

const Comment = ({
  date,
  author,
  commentID,
  checklistID,
  text,
  liked,
  unliked,
  userTrack,
  deleteCommentHandler,
}) => {
  const user = useSelector((state) => state.authSliceReducer.user);
  const navigate = useNavigate();

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
        <LikeDislikeViewButtons
          liked={liked}
          unliked={unliked}
          checklistID={checklistID}
          commentID={commentID}
          userTrack={userTrack}
          isComment
        />
      </div>
      {user && user.nickname === author && (
        <EditDropdown
          // eslint-disable-next-line react/jsx-no-bind
          deleteHandler={deleteCommentHandler.bind(null, commentID)}
        />
      )}
    </li>
  );
};

export default Comment;
