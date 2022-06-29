import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
    name,
    slug,
    tags,
    user_track,
    viewed,
  } = checklist;
  const [iLiked, setILiked] = useState({
    liked: user_track?.liked,
    mount: liked,
  });
  const [iSaved, setISaved] = useState(user_track?.saved);
  const [saveChecklist] = checklistAPI.useSaveChecklistMutation();
  const [unsaveChecklist] = checklistAPI.useUnsaveChecklistMutation();
  const [likeChecklist] = checklistAPI.useLikeChecklistMutation();
  const [dislikeChecklist] = checklistAPI.useDislikeChecklistMutation();
  const [deleteChecklist] = checklistAPI.useDeleteChecklistMutation();
  const [showComplain, setShowComplain] = useState(false);
  const showOnMobile = useMediaQuery("(max-width:575px)");
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const { date } = getTime(created_at);
  const checklistItem = checklist_items.map((item) =>
    item.list_type !== "text" ? { ...item, list_type: "text" } : item
  );
  const fiveItems = checklistItem.slice(0, 5);
  const moreThanFive = checklist_items.length > 5;
  const likeClass = `checklist__liked SFPro-700${
    iLiked.mount ? " active" : ""
  }${iLiked?.liked ? " liked" : ""}`;
  const savedClass = `checklist__bookmark${iSaved ? " saved" : ""}`;
  const [searchParams, setSearchParams] = useSearchParams();
  const token = useSelector((state) => state.authSliceReducer.token);
  const [modalShow, setModalShow] = useState(false);

  const likeHandler = () => {
    if (!iLiked?.liked) likeChecklist(id);
    if (iLiked?.liked) dislikeChecklist(id);

    setILiked((prevState) => ({
      liked: !prevState?.liked,
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
    if (!iSaved) saveChecklist(id);
    if (iSaved) unsaveChecklist(id);
    setISaved((prevState) => !prevState);
  };

  const navigationHandler = (tagID) => {
    if (page === "home") {
      setSearchParams(
        changeSearchParamsValue(searchParams, "search_tag_ids[]", tagID)
      );
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
        <button
          onClick={() =>
            navigate(
              `/${
                page !== "my-active-checklists"
                  ? "checklist"
                  : "active-checklist"
              }/${id}/${slug}`
            )
          }
          type="button"
        >
          {name}
        </button>
      </h3>
      <div className="checklist__head">
        {showOnMobile && time}
        {!created && page === "home" ? (
          <div className="checklist__buttons">
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
        ) : (
          ""
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
        <button
          onClick={() =>
            navigate(
              `/${
                page !== "my-active-checklists"
                  ? "checklist"
                  : "active-checklist"
              }/${id}/${slug}`
            )
          }
          className="checklist__dots SFPro-600"
          type="button"
        >
          <DotsSvg />
        </button>
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
          {page === "home" ? (
            <div className="checklist__inner">
              <span
                className={`${`checklist__viewed SFPro-700`} ${
                  viewed ? "active" : ""
                }`}
              >
                <ViewSvg />
                <span>{viewed}</span>
              </span>
              <button
                onClick={token ? likeHandler : loginHandler}
                className={likeClass}
                type="button"
              >
                <LikeSvg />
                <span>{iLiked.mount}</span>
              </button>
            </div>
          ) : (
            ""
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
