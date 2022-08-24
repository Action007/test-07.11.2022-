import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
} from "../../../services/commentsService";
import ChecklistCommentsInput from "./ChecklistCommentsInput/ChecklistCommentsInput";
import getTime from "../../../utils/getTime";
import Comment from "../Comment/Comment";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
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
  const [addComment, { isSuccess, data }] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const token = useSelector((state) => state.authSliceReducer.token);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuccess) return;
    setComments((pevState) => [data, ...pevState]);
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
        setComments((pevState) => [...lastComments, ...pevState]);
        setNewComment(false);
        return;
      }
      if (lastComments.length === 0 && next_page) {
        addComments(next_page);
      } else {
        setComments((pevState) => [...pevState, ...lastComments]);
      }
    }
  }, [pagination_comments]);

  const showCommentHandler = () => {
    if (next_page) addComments(next_page);
  };

  const onDeleteCommentHandler = (commentID) => {
    deleteComment({ checklist_id: checklistID, comment_id: commentID });
    setComments((pevState) =>
      pevState.filter((comment) => comment.id !== commentID)
    );
  };

  const onSubmitHandler = (inputValue, setInputValue, isValidComment) => {
    if (!token) {
      navigate("/sign-in");
      return;
    }
    if (inputValue.trim().length === 0 || !isValidComment) return;
    addComment({ text: inputValue.trim(), checklist_id: checklistID });
    setInputValue("");
  };

  return (
    <div className="checklist-comments">
      <span className="checklist-comments__review SFPro-600">
        {commentsTotalCount} {translate("checklistReviewPage.review")}
      </span>
      <ChecklistCommentsInput
        submitHandler={onSubmitHandler}
        translate={translate}
      />
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
                checklistID={checklistID}
                text={comment.text}
                liked={comment.liked}
                token={token}
                unliked={comment.unliked}
                userTrack={comment.user_track}
                deleteCommentHandler={onDeleteCommentHandler}
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
  );
};

export default ChecklistComments;
