import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../../../services/checklistService";
import { changeSearchParamsValue } from "../../../utils/searchParamsValue";
import getTime from "../../../utils/getTime";
import useMediaQuery from "../../../hooks/useMediaQuery";
import ChecklistItem from "../ChecklistItem/ChecklistItem";
import EditDropdown from "../EditDropdown/EditDropdown";
import uniqueID from "../../../utils/uniqueID";
import Complain from "../Complain/Complain";
import PopupDelete from "../PopupDelete/PopupDelete";
import "./Checklist.scss";

import { ReactComponent as LikeSvg } from "../../../assets/images/icon/like.svg";
import { ReactComponent as ViewSvg } from "../../../assets/images/icon/view.svg";
import { ReactComponent as Bookmark } from "../../../assets/images/icon/bookmark.svg";
import { ReactComponent as DotsSvg } from "../../../assets/images/icon/dots.svg";
import { ReactComponent as InfoSvg } from "../../../assets/images/icon/info.svg";

const Checklist = ({ checklist, created = false, page = "home" }) => {
  const {
    id,
    checklist_items,
    created_at,
    liked,
    unliked,
    name,
    slug,
    tags,
    user_track,
    viewed,
  } = checklist;
  const token = useSelector((state) => state.authSliceReducer.token);

  const [saveChecklist] = checklistAPI.useSaveChecklistMutation();
  const [unsaveChecklist] = checklistAPI.useUnsaveChecklistMutation();
  const [likeChecklist] = checklistAPI.useLikeChecklistMutation();
  const [dislikeChecklist] = checklistAPI.useDislikeChecklistMutation();
  const [deleteChecklist] = checklistAPI.useDeleteChecklistMutation();

  const [modalShow, setModalShow] = useState(false);
  const [showComplain, setShowComplain] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const showOnMobile = useMediaQuery("(max-width:575px)");
  const { search, pathname } = useLocation();
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { date } = getTime(created_at);

  const checklistItem = checklist_items.map((item) =>
    item.list_type !== "text" ? { ...item, list_type: "text" } : item
  );
  const fiveItems = checklistItem.slice(0, 5);
  const moreThanFive = checklist_items.length > 5;

  const [iSaved, setISaved] = useState(user_track?.saved);
  const savedClass = `checklist__bookmark${iSaved ? " saved" : ""}`;

  const [like, setLiked] = useState(!!user_track?.liked);
  const [dislike, setDisliked] = useState(!!user_track?.unliked);
  const likeAmount = like ? liked + 1 : liked;
  const dislikeAmount = dislike ? unliked + 1 : unliked;
  const finalLikeAmount = user_track?.liked ? likeAmount - 1 : likeAmount;
  const finalDislikeAmount = user_track?.unliked
    ? dislikeAmount - 1
    : dislikeAmount;
  const likeClass = `${`checklist__likes SFPro-700`}${
    liked && finalLikeAmount ? " liked" : ""
  }${like ? " active" : ""}`;
  const dislikeClass = `${`checklist__dislikes SFPro-700`}${
    unliked && finalDislikeAmount ? " disliked" : ""
  }${dislike ? " active" : ""}`;

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

  const saveHandler = () => {
    if (!iSaved) saveChecklist(id);
    if (iSaved) unsaveChecklist(id);
    setISaved((prevState) => !prevState);
  };

  const navigationHandler = (tagID) => {
    if (page === "home") {
      if (!search) {
        setSearchParams(
          `?per_page=5&${changeSearchParamsValue(
            searchParams,
            "search_tag_ids[]",
            tagID
          )}`
        );
      } else {
        setSearchParams(
          changeSearchParamsValue(searchParams, "search_tag_ids[]", tagID)
        );
      }
    } else {
      navigate(`/?page=1&per_page=5&search_tag_ids[]=${tagID}`);
    }
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

  const onDeleteHandler = () => {
    deleteChecklist(id);
    setModalShow(false);
  };

  const onUpdateHandler = () => {
    navigate(`/edit-checklist/${id}`);
  };

  const time = (
    <time className="checklist__time" dateTime={date}>
      <span className="checklist__date">{date}</span>
    </time>
  );

  const head = (
    <>
      <h3 className="checklist__title SFPro-700">
        <Link
          to={`/${
            page !== "my-active-checklists" ? "checklist" : "active-checklist"
          }/${id}/${slug}`}
          state={{ previousPath: pathname }}
        >
          {name}
        </Link>
      </h3>
      <div className="checklist__head">
        {showOnMobile && time}
        {!created && page === "home" && (
          <div className="checklist__wrap">
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
      {created && (
        <EditDropdown
          onUpdateHandler={onUpdateHandler}
          onDeleteHandler={() => setModalShow(true)}
        />
      )}
    </>
  );

  return (
    <>
      <div className="checklist">
        <div className="checklist__heading">{head}</div>
        <ol className="checklist__items">
          {moreThanFive
            ? fiveItems.map(({ description, list_type, value }) => (
                <ChecklistItem
                  key={uniqueID()}
                  description={description}
                  list_type={list_type}
                  value={value}
                />
              ))
            : checklistItem.map(({ description, list_type, value }) => (
                <ChecklistItem
                  key={uniqueID()}
                  description={description}
                  list_type={list_type}
                  value={value}
                />
              ))}
        </ol>
        <Link
          className="checklist__dots SFPro-600"
          to={`/${
            page !== "my-active-checklists" ? "checklist" : "active-checklist"
          }/${id}/${slug}`}
          state={{ previousPath: pathname }}
        >
          <DotsSvg />
        </Link>
        <div className="checklist__tags">
          {tags &&
            tags.map((tag) => (
              <button
                onClick={() => navigationHandler(tag.id)}
                className="checklist__tag"
                key={uniqueID()}
                type="button"
              >
                #{tag.name}
              </button>
            ))}
        </div>
        <div className="checklist__box">
          {page === "home" && (
            <div className="checklist__inner">
              <span
                className={`${`checklist__viewed SFPro-700`} ${
                  viewed ? "active" : ""
                }`}
              >
                <ViewSvg />
                <span>{viewed}</span>
              </span>
              <div className="checklist__buttons">
                <button
                  onClick={setLikeHandler}
                  className={likeClass}
                  type="button"
                >
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
          )}
          {!showOnMobile && time}
        </div>
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
      <PopupDelete
        deleteClickHandler={onDeleteHandler}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Checklist;
