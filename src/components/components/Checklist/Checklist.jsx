import React, { useState } from "react";
import getTime from "../../../utils/getTime";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./Checklist.scss";

import { ReactComponent as RightArrow } from "../../../assets/images/icon/rightArrow.svg";
import { ReactComponent as LikeSvg } from "../../../assets/images/icon/like.svg";
import { ReactComponent as ViewSvg } from "../../../assets/images/icon/view.svg";
import { ReactComponent as Bookmark } from "../../../assets/images/icon/bookmark.svg";
import { ReactComponent as InfoSvg } from "../../../assets/images/icon/info.svg";
import EditDropdown from "../EditDropdown/EditDropdown";
import uniqueID from "../../../utils/uniqueId";
import ProgressBarChecklist from "../ProgressBarChecklist/ProgressBarChecklist";

const Checklist = ({
  checklist,
  translate,
  created = false,
  active = false,
}) => {
  const { checklist_items, created_at, liked, name, tags, viewed } = checklist;
  const [like, setLike] = useState(false);
  const showOnMobile = useMediaQuery("(max-width:575px)");
  const { date } = getTime(created_at);
  const moreThanFive = checklist_items.length > 5;
  const likeClass = `checklist__liked SFPro-700${liked ? " active" : ""}${
    like ? " liked" : ""
  }`;

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
            <button className="checklist__info" type="button">
              <InfoSvg />
            </button>
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
          {moreThanFive ? (
            <li className="checklist__item" key={uniqueID()}>
              {checklist_items[0].description}
              <button className="checklist__show" type="button">
                Show more...
              </button>
            </li>
          ) : (
            checklist_items.map(({ description }) => (
              <li className="checklist__item" key={uniqueID()}>
                {description}
              </li>
            ))
          )}
        </ol>
        <div className="checklist__tags">
          {tags.map((tag) => (
            <span className="checklist__tag" key={uniqueID()}>
              {tag.name}
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
    </>
  );
};

export default Checklist;
