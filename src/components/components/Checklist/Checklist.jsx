import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import getTime from "../../../utils/getTime";
import useMediaQuery from "../../../hooks/useMediaQuery";
import ChecklistItem from "../ChecklistItem/ChecklistItem";
import EditDropdown from "../EditDropdown/EditDropdown";
import uniqueID from "../../../utils/uniqueID";
import ProgressBarChecklist from "../ProgressBarChecklist/ProgressBarChecklist";
import ComplainDropdown from "../ComplainDropdown/ComplainDropdown";
import Complain from "../Complain/Complain";
import "./Checklist.scss";

import { ReactComponent as RightArrow } from "../../../assets/images/icon/rightArrow.svg";
import { ReactComponent as LikeSvg } from "../../../assets/images/icon/like.svg";
import { ReactComponent as ViewSvg } from "../../../assets/images/icon/view.svg";
import { ReactComponent as Bookmark } from "../../../assets/images/icon/bookmark.svg";

const Checklist = ({
  checklist,
  translate,
  created = false,
  active = false,
}) => {
  const { id, checklist_items, created_at, liked, name, slug, tags, viewed } =
    checklist;
  const [like, setLike] = useState(false);
  const [showComplain, setShowComplain] = useState(false);
  const showOnMobile = useMediaQuery("(max-width:575px)");
  const { date } = getTime(created_at);
  const checklistItem = checklist_items.map((item) =>
    item.list_type !== "text" ? { ...item, list_type: "text" } : item
  );
  const fiveItems = checklistItem.slice(0, 5);
  const moreThanFive = checklist_items.length > 5;
  const likeClass = `checklist__liked SFPro-700${liked ? " active" : ""}${
    like ? " liked" : ""
  }`;
  const navigate = useNavigate();

  const setLikeHandler = () => {
    setLike((prevState) => !prevState);
  };

  const time = (
    <time className="checklist__time" dateTime={date}>
      <span className="checklist__date">{date}</span>
    </time>
  );

  const head = (
    <>
      <h3 className="checklist__title SFPro-700">{name}</h3>
      <div className="checklist__head">
        {showOnMobile && time}
        {!created && (
          <div className="checklist__buttons">
            <button className="checklist__bookmark" type="button">
              <Bookmark />
            </button>
            <ComplainDropdown setShowComplain={setShowComplain} />
          </div>
        )}
      </div>
      {created && <EditDropdown />}
    </>
  );

  return (
    <>
      {active && <ProgressBarChecklist done={20} />}
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
        <div className="checklist__tags">
          {tags.map((tag) => (
            <button
              onClick={() => navigate(`/home/tags/${tag.name}`)}
              className="checklist__tag"
              key={uniqueID()}
              type="button"
            >
              {tag.name}
            </button>
          ))}
        </div>
        <div className="checklist__wrap">
          <button
            onClick={() => navigate(`/list/${id}/${slug}`)}
            className="checklist__button SFPro-600"
            type="button"
          >
            <span>{translate}</span>
            <RightArrow />
          </button>
          <div className="checklist__box">
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
                onClick={setLikeHandler}
                className={likeClass}
                type="button"
              >
                <LikeSvg />
                <span>{like ? liked + 1 : liked}</span>
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
            <Complain closeHandler={() => setShowComplain(false)} />
          </Modal.Body>
        </Modal>
      </CSSTransition>
    </>
  );
};

export default Checklist;
