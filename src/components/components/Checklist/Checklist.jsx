import React from "react";
import uniqueID from "../../../utils/uniqueId";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./Checklist.scss";

import { ReactComponent as RightArrow } from "../../../assets/images/icon/rightArrow.svg";
import getTime from "../../../utils/getTime";

const Checklist = ({ checklists }) => {
  const { title, checklist, viewed, liked, created_at, tags } = checklists;
  const showOnMobile = useMediaQuery("(max-width:575px)");
  const { date, hours } = getTime(created_at);

  const time = (
    <time className="checklist__time" dateTime={date}>
      <span className="checklist__date">{date}</span>
      <span className="checklist__hours">{hours}</span>
    </time>
  );

  return (
    <li className="checklist">
      {showOnMobile && time}
      <h3 className="checklist__title SFPro-700">{title}</h3>
      <ol className="checklist__items">
        {checklist.map(({ type }) => (
          <li key={uniqueID()}>{type}</li>
        ))}
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
          <span>Show more</span>
          <RightArrow />
        </button>
        <div className="checklist__wrapper">
          <div className="checklist__inner">
            <span className="checklist__viewed">{viewed}</span>
            <span className="checklist__liked">{liked}</span>
          </div>
          {!showOnMobile && time}
        </div>
      </div>
    </li>
  );
};

export default Checklist;
