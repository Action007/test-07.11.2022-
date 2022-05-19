/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../../../services/checklistService";
import getTime from "../../../utils/getTime";
import Comment from "../Comment/Comment";
import "./ChecklistComments.scss";

import { ReactComponent as ArrowSvg } from "../../../assets/images/icon/rightArrow.svg";

const ChecklistComments = ({
  pagination_comments,
  addComments,
  next_page,
  checklistID,
}) => {
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");
  const [addComment] = checklistAPI.useAddCommentMutation();
  const [likeComment] = checklistAPI.useLikeCommentMutation();
  const [unlikeComment] = checklistAPI.useUnlikeCommentMutation();
  const [updateComment] = checklistAPI.useUpdateCommentMutation();
  const [deleteComment] = checklistAPI.useDeleteCommentMutation();
  const { t: translate } = useTranslation();

  useEffect(() => {
    setComments([...comments, ...pagination_comments]);
  }, [pagination_comments]);

  const showCommentHandler = () => {
    if (next_page) addComments(next_page);
  };

  const onLikeHandler = (id) => {
    likeComment({ checklist_id: checklistID, comment_id: id });
  };

  const onUnlikeHandler = (id) => {
    unlikeComment({ checklist_id: checklistID, comment_id: id });
  };

  const onUpdateHandler = (id) => {
    updateComment({ checklist_id: checklistID, comment_id: id });
  };

  const onDeleteHandler = (id) => {
    deleteComment({ checklist_id: checklistID, comment_id: id });
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (value.trim().length === 0) return;
    if (value.trim().length === 0) return;
    // const items = [
    //   ...data,
    //   {
    //     created_at: new Date().toISOString(),
    //     id: checklistID,
    //     liked: 0,
    //     text: value,
    //     unliked: 0,
    //     user_id: 25,
    //     user_track: null,
    //   },
    // ];

    // setData(
    //   [...items].sort((a, b) => {
    //     const c = new Date(a.created_at);
    //     const d = new Date(b.created_at);
    //     return d - c;
    //   })
    // );

    addComment({ text: value, checklist_id: checklistID });
    setValue("");
  };

  return (
    <div className="checklist-comments">
      <span className="checklist-comments__review SFPro-600">
        {comments.length} Reviews
      </span>
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className="checklist-comments__form"
      >
        <label className="checklist-comments__label" htmlFor="checklistReview">
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
                date={date}
                commentID={comment.id}
                text={comment.text}
                liked={comment.liked}
                unliked={comment.unliked}
                onLikeHandler={onLikeHandler}
                onUnlikeHandler={onUnlikeHandler}
                onUpdateHandler={onUpdateHandler}
                onDeleteHandler={onDeleteHandler}
              />
            );
          })}
      </ul>
      {next_page && (
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
