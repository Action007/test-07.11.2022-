import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useDislikeChecklistMutation,
  useLikeChecklistMutation,
} from "../../../services/checklistService";
import {
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} from "../../../services/commentsService";
import formatLargeNumbers from "../../../utils/formatLargeNumbers";
import "./LikeDislikeViewButtons.scss";

import { ReactComponent as LikeSvg } from "../../../assets/images/icon/like.svg";
import { ReactComponent as ViewSvg } from "../../../assets/images/icon/view.svg";

const LikeDislikeViewButtons = ({
  liked,
  unliked,
  viewed,
  checklistID,
  commentID,
  userTrack,
  isComment,
}) => {
  const token = useSelector((state) => state.authSliceReducer.token);

  const [likeChecklist] = useLikeChecklistMutation();
  const [dislikeChecklist] = useDislikeChecklistMutation();
  const [likeComment] = useLikeCommentMutation();
  const [unlikeComment] = useUnlikeCommentMutation();

  const [like, setLiked] = useState(!!userTrack?.liked);
  const [dislike, setDisliked] = useState(!!userTrack?.unliked);

  const navigate = useNavigate();

  const likeAmount = () => {
    let amount;
    if (like) {
      amount = liked + 1;
    } else {
      amount = liked;
    }
    if (userTrack?.liked) {
      amount -= 1;
    }

    return amount;
  };

  const unlikeAmount = () => {
    let amount;
    if (dislike) {
      amount = unliked + 1;
    } else {
      amount = unliked;
    }
    if (userTrack?.unliked) {
      amount -= 1;
    }

    return amount;
  };

  const onLikeHandler = () => {
    if (token) {
      setLiked((prevState) => !prevState);
      setDisliked(false);

      if (isComment) {
        likeComment({ checklist_id: checklistID, comment_id: commentID });
      } else {
        likeChecklist(checklistID);
      }
    } else {
      navigate("/sign-in");
    }
  };

  const onUnlikeHandler = () => {
    if (token) {
      setDisliked((prevState) => !prevState);
      setLiked(false);

      if (isComment) {
        unlikeComment({ checklist_id: checklistID, comment_id: commentID });
      } else {
        dislikeChecklist(checklistID);
      }
    } else {
      navigate("/sign-in");
    }
  };

  const likeClass = `${`checklist-buttons__likes SFPro-700`}${
    liked && likeAmount() ? " liked" : ""
  }${like ? " active" : ""}`;
  const unlikeClass = `${`checklist-buttons__dislikes SFPro-700`}${
    unliked && unlikeAmount() ? " disliked" : ""
  }${dislike ? " active" : ""}`;

  return (
    <div className="checklist-buttons">
      {!isComment && (
        <span
          className={`${`checklist-buttons__viewed SFPro-700`} ${
            viewed ? "active" : ""
          }`}
        >
          <ViewSvg />
          <span>{formatLargeNumbers(viewed)}</span>
        </span>
      )}
      <button onClick={onLikeHandler} className={likeClass} type="button">
        <LikeSvg />
        <p>{formatLargeNumbers(likeAmount())}</p>
      </button>
      <button onClick={onUnlikeHandler} className={unlikeClass} type="button">
        <LikeSvg />
        <p>{formatLargeNumbers(unlikeAmount())}</p>
      </button>
    </div>
  );
};

export default LikeDislikeViewButtons;
