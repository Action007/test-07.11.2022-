import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useLazyFetchCommentsQuery,
} from "../../../services/commentsService";
import ChecklistCommentsInput from "./ChecklistCommentsInput/ChecklistCommentsInput";
import getTime from "../../../utils/getTime";
import Comment from "../Comment/Comment";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import "./ChecklistComments.scss";

import { ReactComponent as ArrowSvg } from "../../../assets/images/icon/rightArrow.svg";

const ChecklistComments = ({
  checklistComments,
  comments_paginate,
  checklistID,
}) => {
  const [page, setPage] = useState(1);
  const [commentsPaginate, setCommentsPaginate] = useState(comments_paginate);
  const [comments, setComments] = useState(checklistComments);

  const [
    fetchComments,
    {
      data: commentsData,
      isSuccess: isFetchCommentsSuccess,
      isFetching: isFetchLoading,
    },
  ] = useLazyFetchCommentsQuery();

  const [createComment, { isSuccess: isCreateSuccess, data }] =
    useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();
  const { t: translate } = useTranslation();

  useEffect(() => {
    if (!isCreateSuccess) return;
    setComments((pevState) => [data, ...pevState]);
  }, [isCreateSuccess]);

  useEffect(() => {
    if (!isFetchCommentsSuccess) return;

    const newComments = commentsData.pagination_comments.filter(
      (item) => !comments.find((comment) => comment.id === item.id)
    );

    if (!newComments.length) {
      setPage((prevState) => prevState + 1);
      fetchComments({
        id: checklistID,
        page: page + 1,
        perPage: 5,
      });
      return;
    }

    setComments([...comments, ...newComments]);
    setCommentsPaginate(commentsData.paginate);
  }, [commentsData]);

  const onDeleteCommentHandler = (commentID) => {
    deleteComment({ checklist_id: checklistID, comment_id: commentID });
    setComments((pevState) =>
      pevState.filter((comment) => comment.id !== commentID)
    );
  };

  const onClickShowMoreCommentsHandler = () => {
    setPage((prevState) => prevState + 1);
    fetchComments({
      id: checklistID,
      page: page + 1,
      perPage: 5,
    });
  };

  const onSubmitHandler = (inputValue, setInputValue, isValidComment) => {
    if (!token) {
      navigate("/sign-in");
      return;
    }
    if (inputValue.trim().length === 0 || !isValidComment) return;
    createComment({ text: inputValue.trim(), checklist_id: checklistID });
    setInputValue("");
  };

  return (
    <div className="checklist-comments">
      <span className="checklist-comments__review SFPro-600">
        {translate("checklistReviewPage.review")}
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
                unliked={comment.unliked}
                userTrack={comment.user_track}
                deleteCommentHandler={onDeleteCommentHandler}
                token={token}
              />
            );
          })}
      </ul>
      {!commentsPaginate["last_page?"] &&
        commentsPaginate.next_page &&
        !!comments.length &&
        (!isFetchLoading ? (
          <button
            onClick={onClickShowMoreCommentsHandler}
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
