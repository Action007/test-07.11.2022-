/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checklistAPI } from "../../../services/checklistService";
import getTime from "../../../utils/getTime";
import Comment from "../Comment/Comment";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import "./ChecklistComments.scss";

import { ReactComponent as ArrowSvg } from "../../../assets/images/icon/rightArrow.svg";

const ChecklistComments = ({
  commentsTotalCount,
  pagination_comments,
  addComments,
  next_page,
  checklistID,
  loadingComments,
}) => {
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");
  const [newComment, setNewComment] = useState(false);
  const [addComment, { isSuccess, isLoading }] =
    checklistAPI.useAddCommentMutation();
  const [likeComment] = checklistAPI.useLikeCommentMutation();
  const [unlikeComment] = checklistAPI.useUnlikeCommentMutation();
  const [deleteComment] = checklistAPI.useDeleteCommentMutation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuccess) return;
    setNewComment(true);
    addComments(1);
  }, [isSuccess]);

  useEffect(() => {
    if (!comments.length) setComments(pagination_comments);
    if (comments.length) {
      const lastComments = pagination_comments.filter(
        (item) => !comments.find((comment) => comment.id === item.id)
      );
      if (newComment) {
        setComments([...lastComments, ...comments]);
        setNewComment(false);
        return;
      }
      if (lastComments.length === 0 && next_page) {
        addComments(next_page);
      } else {
        setComments([...comments, ...lastComments]);
      }
    }
  }, [pagination_comments]);

  const showCommentHandler = () => {
    if (next_page) addComments(next_page);
  };

  const onLikeHandler = (id) => {
    if (token) likeComment({ checklist_id: checklistID, comment_id: id });
    if (!token) navigate("/sign-in");
  };

  const onUnlikeHandler = (id) => {
    if (token) unlikeComment({ checklist_id: checklistID, comment_id: id });
    if (!token) navigate("/sign-in");
  };

  const onDeleteHandler = (id) => {
    if (token) deleteComment({ checklist_id: checklistID, comment_id: id });
    if (!token) navigate("/sign-in");
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!token) navigate("/sign-in");
    if (value.trim().length === 0) return;

    addComment({ text: value, checklist_id: checklistID });
    setValue("");
  };

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isLoading} />
      <div className="checklist-comments">
        <span className="checklist-comments__review SFPro-600">
          {commentsTotalCount} Reviews
        </span>
        <form
          onSubmit={(e) => onSubmitHandler(e)}
          className="checklist-comments__form"
        >
          <label
            className="checklist-comments__label"
            htmlFor="checklistReview"
          >
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
          {comments &&
            comments.map((comment) => {
              const { date } = getTime(comment.created_at);
              return (
                <Comment
                  key={comment.id}
                  author={comment.author}
                  date={date}
                  commentID={comment.id}
                  text={comment.text}
                  liked={comment.liked}
                  unliked={comment.unliked}
                  onLikeHandler={onLikeHandler}
                  onUnlikeHandler={onUnlikeHandler}
                  onDeleteHandler={onDeleteHandler}
                  userTrack={comment.user_track}
                />
              );
            })}
        </ul>
        {next_page &&
          commentsTotalCount !== comments.length &&
          (!loadingComments ? (
            <button
              onClick={showCommentHandler}
              className="checklist-comments__button SFPro-500"
              type="button"
            >
              <ArrowSvg />
              {translate("checklistReviewPage.moreComments")}
            </button>
          ) : (
            <div className="checklist-comments__loading SFPro-500">
              <LoadingSpinner />
              {translate("checklistReviewPage.loading")}
            </div>
          ))}
      </div>
    </>
  );
};

export default ChecklistComments;
