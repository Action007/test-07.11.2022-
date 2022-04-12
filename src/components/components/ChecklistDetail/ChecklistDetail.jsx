import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Modal from "react-bootstrap/Modal";
import { checklistAPI } from "../../../services/checklistService";
import Complain from "../Complain/Complain";
import ComplainDropdown from "../ComplainDropdown/ComplainDropdown";
import ChecklistItem from "../ChecklistItem/ChecklistItem";
import uniqueID from "../../../utils/uniqueID";
import getTime from "../../../utils/getTime";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./ChecklistDetail.scss";

import { ReactComponent as RightArrow } from "../../../assets/images/icon/arrow.svg";
import { ReactComponent as LikeSvg } from "../../../assets/images/icon/like.svg";
import { ReactComponent as ViewSvg } from "../../../assets/images/icon/view.svg";
import { ReactComponent as Bookmark } from "../../../assets/images/icon/bookmark.svg";

const ChecklistDetail = ({ checklists, detailPage = false }) => {
  const {
    id,
    checklist_items,
    created_at,
    liked,
    name,
    tags,
    user_track,
    viewed,
  } = checklists;
  const [iLiked, setILiked] = useState({
    liked: user_track?.liked,
    mount: liked,
  });
  const [showComplain, setShowComplain] = useState(false);
  const [iSaved, setISaved] = useState(user_track?.saved);
  // eslint-disable-next-line no-empty-pattern
  const [saveChecklist, {}] = checklistAPI.useSaveChecklistMutation();
  // eslint-disable-next-line no-empty-pattern
  const [likeChecklist, {}] = checklistAPI.useLikeChecklistMutation();
  // eslint-disable-next-line no-empty-pattern
  const [dislikeChecklist, {}] = checklistAPI.useDislikeChecklistMutation();
  const { t: translate } = useTranslation();
  const showOnMobile = useMediaQuery("(max-width:575px)");
  const { date } = getTime(created_at);
  const likeClass = `checklist-detail__liked SFPro-700${
    iLiked.mount ? " active" : ""
  }${iLiked.liked ? " liked" : ""}`;
  const savedClass = `checklist-detail__bookmark${iSaved ? " saved" : ""}`;
  const navigate = useNavigate();

  const likeHandler = () => {
    if (detailPage) {
      if (!iLiked.liked) likeChecklist(id);
      if (iLiked.liked) dislikeChecklist(id);
    }
    // eslint-disable-next-line no-shadow
    setILiked((prevState) => ({
      liked: !prevState.liked,
      // eslint-disable-next-line no-nested-ternary
      mount: !prevState?.liked
        ? user_track?.liked
          ? liked
          : liked + 1
        : user_track?.liked
        ? liked - 1
        : liked,
    }));
  };

  const saveHandler = () => {
    if (detailPage) saveChecklist(id);
    setISaved((prevState) => !prevState);
  };

  const time = (
    <time className="checklist-detail__time" dateTime={date}>
      <span className="checklist-detail__date">{date}</span>
    </time>
  );

  return (
    <>
      <div className="checklist-detail__wrapper">
        <div className="checklist-detail__heading">
          <h3 className="checklist-detail__title SFPro-700">{name}</h3>
          <div className="checklist-detail__head">
            {showOnMobile && time}
            {detailPage && (
              <div className="checklist-detail__buttons">
                <button
                  onClick={saveHandler}
                  className={savedClass}
                  type="button"
                >
                  <Bookmark />
                </button>
                <ComplainDropdown setShowComplain={setShowComplain} />
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
            />
          ))}
        </ol>
        <div className="checklist-detail__tags">
          {tags.map((tag) => (
            <button
              onClick={() => navigate(`/home/tags/${tag.name}`)}
              className="checklist-detail__tag"
              key={uniqueID()}
              type="button"
            >
              {tag.name}
            </button>
          ))}
        </div>
        <div className="checklist-detail__wrap">
          <button className="checklist-detail__button SFPro-600" type="button">
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
              <button onClick={likeHandler} className={likeClass} type="button">
                <LikeSvg />
                <span>{iLiked.mount}</span>
              </button>
            </div>
            {!showOnMobile && time}
          </div>
        </div>
      </div>
      <CSSTransition in={showComplain} timeout={300} unmountOnExit>
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
            <Complain closeHandler={() => setShowComplain(false)} id={id} />
          </Modal.Body>
        </Modal>
      </CSSTransition>
    </>
  );
};

export default ChecklistDetail;
