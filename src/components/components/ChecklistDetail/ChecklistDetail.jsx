import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ChecklistItem from "../ChecklistItem/ChecklistItem";
import uniqueID from "../../../utils/uniqueId";
import getTime from "../../../utils/getTime";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./ChecklistDetail.scss";

import { ReactComponent as RightArrow } from "../../../assets/images/icon/arrow.svg";
import { ReactComponent as LikeSvg } from "../../../assets/images/icon/like.svg";
import { ReactComponent as ViewSvg } from "../../../assets/images/icon/view.svg";
import { ReactComponent as Bookmark } from "../../../assets/images/icon/bookmark.svg";
import { ReactComponent as InfoSvg } from "../../../assets/images/icon/info.svg";

const ChecklistDetail = ({ checklists, preview = false }) => {
  const { title, checklist_items, viewed, liked, created_at, tags } =
    checklists;
  const [like, setLike] = useState(false);
  const { t: translate } = useTranslation();
  const showOnMobile = useMediaQuery("(max-width:575px)");
  const { date } = getTime(created_at);
  const likeClass = `checklist-detail__liked SFPro-700${
    liked ? " active" : ""
  }${like ? " liked" : ""}`;

  const setLikeHandler = () => {
    setLike((prevState) => !prevState);
  };

  const time = (
    <time className="checklist-detail__time" dateTime={date}>
      <span className="checklist-detail__date">{date}</span>
    </time>
  );

  return (
    <div className="checklist-detail">
      <div className="checklist-detail__heading">
        <h3 className="checklist-detail__title SFPro-700">{title}</h3>
        <div className="checklist-detail__head">
          {showOnMobile && time}
          <div className="checklist-detail__buttons">
            <button className="checklist-detail__bookmark" type="button">
              <Bookmark />
            </button>
            <button className="checklist-detail__info" type="button">
              <InfoSvg />
            </button>
          </div>
        </div>
      </div>
      <ol className="checklist-detail__items">
        {checklist_items.map(({ description, list_type, value }) => (
          <ChecklistItem
            description={description}
            list_type={list_type}
            value={value}
          />
        ))}
      </ol>
      <div className="checklist-detail__tags">
        {preview
          ? tags.map(({ name, id }) => (
              <span className="checklist-detail__tag" key={id}>
                {name}
              </span>
            ))
          : tags.map((tag) => (
              <span className="checklist-detail__tag" key={uniqueID()}>
                {tag}
              </span>
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
            <button
              onClick={setLikeHandler}
              className={likeClass}
              type="button"
            >
              <LikeSvg />
              <span>{liked}</span>
            </button>
          </div>
          {!showOnMobile && time}
        </div>
      </div>
    </div>
  );
};

export default ChecklistDetail;
