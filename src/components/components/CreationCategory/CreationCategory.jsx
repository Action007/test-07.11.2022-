import React from "react";
import { useTranslation } from "react-i18next";
import useClickOutside from "../../../hooks/useClickOutside";
import "./CreationCategory.scss";

import { ReactComponent as ArrowSvg } from "../../../assets/images/icon/rightArrow.svg";
import { ReactComponent as AnimalsSvg } from "../../../assets/images/icon/animals.svg";
import { ReactComponent as ArtSvg } from "../../../assets/images/icon/art.svg";
import { ReactComponent as BeautySvg } from "../../../assets/images/icon/beauty.svg";
import { ReactComponent as BooksSvg } from "../../../assets/images/icon/books.svg";
import { ReactComponent as WorkSvg } from "../../../assets/images/icon/work.svg";
import { ReactComponent as CarsSvg } from "../../../assets/images/icon/cars.svg";
import { ReactComponent as ChildrenSvg } from "../../../assets/images/icon/children.svg";
import { ReactComponent as DatingSvg } from "../../../assets/images/icon/dating.svg";
import { ReactComponent as EducationSvg } from "../../../assets/images/icon/education.svg";
import { ReactComponent as EntertainmentSvg } from "../../../assets/images/icon/entertainment.svg";
import { ReactComponent as FinanceSvg } from "../../../assets/images/icon/finance.svg";
import { ReactComponent as FoodSvg } from "../../../assets/images/icon/food.svg";
import { ReactComponent as HealthSvg } from "../../../assets/images/icon/health.svg";
import { ReactComponent as HomeSvg } from "../../../assets/images/icon/home.svg";
import { ReactComponent as MusicSvg } from "../../../assets/images/icon/music.svg";
import { ReactComponent as NatureSvg } from "../../../assets/images/icon/nature.svg";
import { ReactComponent as SocialSvg } from "../../../assets/images/icon/social.svg";
import { ReactComponent as SportSvg } from "../../../assets/images/icon/sport.svg";
import { ReactComponent as TravelSvg } from "../../../assets/images/icon/travel.svg";

const CreationCategory = () => {
  const { ref, show, setShowHandler } = useClickOutside();
  const { t: translate } = useTranslation();

  const categories = [
    {
      id: 2,
      name: translate("sidebar.animals"),
      svg: <AnimalsSvg />,
      fill: true,
    },
    {
      id: 3,
      name: translate("sidebar.art"),
      svg: <ArtSvg />,
      fill: true,
    },
    {
      id: 4,
      name: translate("sidebar.beauty"),
      svg: <BeautySvg />,
      fill: true,
    },
    { id: 5, name: translate("sidebar.books"), svg: <BooksSvg /> },
    { id: 6, name: translate("sidebar.work"), svg: <WorkSvg /> },
    { id: 7, name: translate("sidebar.cars"), svg: <CarsSvg /> },
    {
      id: 8,
      name: translate("sidebar.children"),
      svg: <ChildrenSvg />,
      fill: true,
    },
    { id: 9, name: translate("sidebar.dating"), svg: <DatingSvg /> },
    { id: 10, name: translate("sidebar.education"), svg: <EducationSvg /> },
    {
      id: 11,
      name: translate("sidebar.entertainment"),
      svg: <EntertainmentSvg />,
      fill: true,
    },
    { id: 12, name: translate("sidebar.finance"), svg: <FinanceSvg /> },
    { id: 13, name: translate("sidebar.food"), svg: <FoodSvg /> },
    {
      id: 14,
      name: translate("sidebar.health"),
      svg: <HealthSvg />,
      fill: true,
    },
    { id: 15, name: translate("sidebar.home"), svg: <HomeSvg /> },
    { id: 16, name: translate("sidebar.music"), svg: <MusicSvg /> },
    { id: 17, name: translate("sidebar.nature"), svg: <NatureSvg /> },
    {
      id: 18,
      name: translate("sidebar.social"),
      svg: <SocialSvg />,
      fill: true,
    },
    { id: 19, name: translate("sidebar.sport"), svg: <SportSvg /> },
    { id: 20, name: translate("sidebar.travel"), svg: <TravelSvg /> },
  ];

  return (
    <div className="select-category" ref={ref}>
      <button
        onClick={setShowHandler}
        className="select-category__button SFPro-600"
        type="button"
      >
        {translate("sidebar.select")}
        <ArrowSvg />
      </button>
      {show && (
        <ul className="select-category__list SFPro-700">
          {categories.map((item) => (
            <li key={item.id} className="select-category__item">
              <button
                className={`select-category__btn${
                  item.fill
                    ? " select-category__btn--fill"
                    : " select-category__btn--stroke"
                }`}
                type="button"
              >
                {item.svg}
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CreationCategory;
