import React from "react";
import uniqueID from "../../../utils/uniqueId";
import getTime from "../../../utils/getTime";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./Checklist.scss";

import { ReactComponent as RightArrow } from "../../../assets/images/icon/rightArrow.svg";
import { ReactComponent as LikeSvg } from "../../../assets/images/icon/like.svg";
import { ReactComponent as ViewSvg } from "../../../assets/images/icon/view.svg";
import { ReactComponent as Bookmark } from "../../../assets/images/icon/bookmark.svg";
import { ReactComponent as InfoSvg } from "../../../assets/images/icon/info.svg";

const Checklist = ({
  checklists,
  translate,
  created = false,
  details = false,
}) => {
  const { title, checklist, viewed, liked, created_at, tags } = checklists;
  const showOnMobile = useMediaQuery("(max-width:575px)");
  const { date, hours } = getTime(created_at);
  const moreThanFive = !details && checklist.length > 5;

  const time = (
    <time className="checklist__time" dateTime={date}>
      <span className="checklist__date">{date}</span>
      <span className="checklist__hours">{hours}</span>
    </time>
  );

  const timeButtons = (
    <div className="checklist__heading">
      <time className="checklist__time" dateTime={date}>
        <span className="checklist__date">{date}</span>
        <span className="checklist__hours">{hours}</span>
      </time>
      <div className="checklist__buttons">
        <button className="checklist__bookmark" type="button">
          <Bookmark />
        </button>
        <button className="checklist__info" type="button">
          <InfoSvg />
        </button>
      </div>
    </div>
  );

  const head = (
    <div className="checklist__heading">
      <h3 className="checklist__title SFPro-700">{title}</h3>
      <div className="checklist__buttons">
        <button className="checklist__bookmark" type="button">
          <Bookmark />
        </button>
        <button className="checklist__info" type="button">
          <InfoSvg />
        </button>
      </div>
    </div>
  );

  return (
    <div className="checklist__wrapper">
      {showOnMobile && !created && timeButtons}
      {showOnMobile && created && time}
      {!showOnMobile && !created ? (
        head
      ) : (
        <h3 className="checklist__title SFPro-700">{title}</h3>
      )}
      <ol className="checklist__items">
        {moreThanFive ? (
          <li className="checklist__item" key={uniqueID()}>
            {checklist[0].type}
            <button className="checklist__show" type="button">
              Show more...
            </button>
          </li>
        ) : (
          checklist.map(({ type }) => (
            <li className="checklist__item" key={uniqueID()}>
              {type}
            </li>
          ))
        )}
      </ol>
      <div className="checklist__tags">
        {tags.map((tag) => (
          <span className="checklist__tag" key={uniqueID()}>
            {tag}
          </span>
        ))}
      </div>
      <div className="checklist__wrap">
        <button className="checklist__button SFPro-600" type="button">
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
              className={`${`checklist__liked SFPro-700`} ${
                liked ? "active" : ""
              }`}
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

export default Checklist;
