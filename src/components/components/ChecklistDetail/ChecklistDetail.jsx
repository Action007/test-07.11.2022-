import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { checklistAPI } from "../../../services/checklistService";
import Complain from "../Complain/Complain";
import ChecklistItem from "../ChecklistItem/ChecklistItem";
import uniqueID from "../../../utils/uniqueID";
import getTime from "../../../utils/getTime";
import useMediaQuery from "../../../hooks/useMediaQuery";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import "./ChecklistDetail.scss";

import { ReactComponent as RightArrow } from "../../../assets/images/icon/arrow.svg";
import { ReactComponent as LikeSvg } from "../../../assets/images/icon/like.svg";
import { ReactComponent as ViewSvg } from "../../../assets/images/icon/view.svg";
import { ReactComponent as Bookmark } from "../../../assets/images/icon/bookmark.svg";
import { ReactComponent as InfoSvg } from "../../../assets/images/icon/info.svg";

const ChecklistDetail = ({
  checklist,
  detailPage = false,
  preview = false,
  setNotification,
  setIsError,
}) => {
  const {
    id,
    checklist_items,
    created_at,
    liked,
    unliked,
    name,
    tags,
    user_track,
    viewed,
  } = checklist;
  const token = useSelector((state) => state.authSliceReducer.token);

  const [
    addActiveChecklist,
    {
      data,
      isSuccess: isStartSuccess,
      isError: isStartError,
      isLoading,
      error: startError,
    },
  ] = checklistAPI.useAddActiveChecklistMutation();
  const [saveChecklist] = checklistAPI.useSaveChecklistMutation();
  const [unsaveChecklist] = checklistAPI.useUnsaveChecklistMutation();
  const [likeChecklist] = checklistAPI.useLikeChecklistMutation();
  const [dislikeChecklist] = checklistAPI.useDislikeChecklistMutation();

  const { date } = getTime(created_at);
  const showOnMobile = useMediaQuery("(max-width:575px)");
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const [showComplain, setShowComplain] = useState(false);
  const [iSaved, setISaved] = useState(user_track?.saved);
  const [like, setLiked] = useState(!!user_track?.liked);
  const [dislike, setDisliked] = useState(!!user_track?.unliked);
  const likeAmount = like ? liked + 1 : liked;
  const dislikeAmount = dislike ? unliked + 1 : unliked;
  const finalLikeAmount = user_track?.liked ? likeAmount - 1 : likeAmount;
  const finalDislikeAmount = user_track?.unliked
    ? dislikeAmount - 1
    : dislikeAmount;
  const likeClass = `${`checklist-detail__likes SFPro-700`}${
    liked && finalLikeAmount ? " liked" : ""
  }${like ? " active" : ""}`;
  const dislikeClass = `${`checklist-detail__dislikes SFPro-700`}${
    unliked && finalDislikeAmount ? " disliked" : ""
  }${dislike ? " active" : ""}`;
  const savedClass = `checklist-detail__bookmark${iSaved ? " saved" : ""}`;

  useEffect(() => {
    let showNotification;
    if (isStartSuccess) {
      navigate(`/active-checklist/${data.entities.id}/${data.entities.slug}`);
    } else if (
      isStartError &&
      startError.data.error === "record_already_exist"
    ) {
      setIsError(true);
      setNotification(true);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      showNotification = setTimeout(() => setNotification(false), 5000);
    }

    return () => {
      if (showNotification) clearTimeout(showNotification);
    };
  }, [isStartSuccess, isStartError]);

  const setLikeHandler = () => {
    setLiked((prevState) => !prevState);
    setDisliked(false);
    likeChecklist(id);
  };

  const setDislikeHandler = () => {
    setDisliked((prevState) => !prevState);
    setLiked(false);
    dislikeChecklist(id);
  };

  const addActiveChecklistHandler = () => {
    if (token) {
      addActiveChecklist({ checklist_id: id });
    } else {
      navigate("/sign-in");
    }
  };

  const saveHandler = () => {
    if (!iSaved) saveChecklist(id);
    if (iSaved) unsaveChecklist(id);
    setISaved((prevState) => !prevState);
  };

  const navigationHandler = (tagID) => {
    navigate(`/?page=1&per_page=5&search_tag_ids[]=${tagID}`);
  };

  const loginHandler = () => {
    navigate(`/sign-in`);
  };

  const complainHandler = () => {
    if (token) {
      setShowComplain(true);
    } else {
      loginHandler();
    }
  };

  const time = (
    <time className="checklist-detail__time" dateTime={date}>
      <span className="checklist-detail__date">{date}</span>
    </time>
  );

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isLoading} />
      <div className="checklist-detail__wrapper">
        <div className="checklist-detail__heading">
          <h3 className="checklist-detail__title SFPro-700">{name}</h3>
          <div className="checklist-detail__head">
            {showOnMobile && time}
            {detailPage && (
              <div className="checklist-detail__btns">
                <button
                  onClick={token ? saveHandler : loginHandler}
                  className={savedClass}
                  type="button"
                >
                  <Bookmark />
                </button>
                <div className="complain-dropdown SFPro-500">
                  <button
                    onClick={complainHandler}
                    className="complain-dropdown__info"
                    type="button"
                  >
                    <InfoSvg />
                  </button>
                  <span className="complain-dropdown__desc">
                    {translate("supportPage.button")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <ol className="checklist-detail__items">
          {checklist_items.map(({ description, list_type, value }) => (
            <ChecklistItem
              key={uniqueID()}
              description={description}
              list_type={list_type}
              value={value}
              preview={preview}
            />
          ))}
        </ol>
        <div className={`checklist-detail__tags${preview ? " preview" : ""}`}>
          {tags.map((tag) =>
            !preview ? (
              <button
                onClick={() => navigationHandler(tag.id)}
                className="checklist-detail__tag"
                key={uniqueID()}
                type="button"
              >
                #{tag.name}
              </button>
            ) : (
              <div className="checklist-detail__tag" key={uniqueID()}>
                #{tag.name}
              </div>
            )
          )}
        </div>
        {!preview && (
          <div className="checklist-detail__wrap">
            <button
              onClick={addActiveChecklistHandler}
              className="checklist-detail__button SFPro-600"
              type="button"
            >
              <span>{translate("checklistReviewPage.button")}</span>
              <RightArrow />
            </button>
            <div className="checklist-detail__box">
              <div className="checklist-detail__inner">
                <span
                  className={`${`checklist-detail__viewed SFPro-700`} ${
                    viewed ? "active" : ""
                  }`}
                >
                  <ViewSvg />
                  <span>{viewed}</span>
                </span>
                <div className="checklist-detail__buttons">
                  <button
                    onClick={token ? setLikeHandler : loginHandler}
                    className={likeClass}
                    type="button"
                  >
                    <LikeSvg />
                    {finalLikeAmount}
                  </button>
                  <button
                    onClick={token ? setDislikeHandler : loginHandler}
                    className={dislikeClass}
                    type="button"
                  >
                    <LikeSvg />
                    {finalDislikeAmount}
                  </button>
                </div>
              </div>
              {!showOnMobile && time}
            </div>
          </div>
        )}
      </div>
      <Modal
        className="popup-complain"
        show={showComplain}
        onHide={setShowComplain}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" />
        </Modal.Header>
        <Modal.Body>
          <Complain
            closeHandler={() => setShowComplain(false)}
            id={id}
            name={name}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChecklistDetail;
