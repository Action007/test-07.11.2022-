import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./Sidebar.scss";

import { ReactComponent as AccordionSvg } from "../../../assets/images/icon/accordion.svg";
import { ReactComponent as UnChecked } from "../../../assets/images/icon/unChecked.svg";
import { ReactComponent as Checked } from "../../../assets/images/icon/checked.svg";
import { ReactComponent as PopularSvg } from "../../../assets/images/icon/popular.svg";
import { ReactComponent as PrintingSvg } from "../../../assets/images/icon/printing.svg";
import { ReactComponent as VocabularySvg } from "../../../assets/images/icon/vocabulary.svg";
import { ReactComponent as SpaceSvg } from "../../../assets/images/icon/space.svg";
import { ReactComponent as SportSvg } from "../../../assets/images/icon/sport.svg";
import { ReactComponent as HealthSvg } from "../../../assets/images/icon/health.svg";
import { ReactComponent as PlantsSvg } from "../../../assets/images/icon/plants.svg";
import { ReactComponent as NatureSvg } from "../../../assets/images/icon/nature.svg";
import { ReactComponent as MusicSvg } from "../../../assets/images/icon/music.svg";
import { ReactComponent as CinemaSvg } from "../../../assets/images/icon/cinema.svg";
import { ReactComponent as ScienceSvg } from "../../../assets/images/icon/science.svg";
import { ReactComponent as InternetSvg } from "../../../assets/images/icon/internet.svg";
import { ReactComponent as FoodSvg } from "../../../assets/images/icon/food.svg";

const Sidebar = () => {
  const [accordion, setAccordion] = useState(false);
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const [active, setActive] = useState(0);
  const { t: translate } = useTranslation();

  const categories = [
    {
      id: 0,
      name: translate("sidebar.selectAll"),
      unChecked: <UnChecked />,
      checked: <Checked />,
      type: "checkbox",
    },
    {
      id: 1,
      name: translate("sidebar.popular"),
      svg: <PopularSvg />,
      type: "popular",
    },
    { id: 2, name: translate("sidebar.printingHouse"), svg: <PrintingSvg /> },
    { id: 3, name: translate("sidebar.vocabulary"), svg: <VocabularySvg /> },
    { id: 4, name: translate("sidebar.space"), svg: <SpaceSvg /> },
    { id: 5, name: translate("sidebar.sport"), svg: <SportSvg /> },
    { id: 6, name: translate("sidebar.health"), svg: <HealthSvg /> },
    { id: 7, name: translate("sidebar.plants"), svg: <PlantsSvg /> },
    { id: 8, name: translate("sidebar.nature"), svg: <NatureSvg /> },
    { id: 9, name: translate("sidebar.music"), svg: <MusicSvg /> },
    { id: 10, name: translate("sidebar.cinema"), svg: <CinemaSvg /> },
    { id: 11, name: translate("sidebar.science"), svg: <ScienceSvg /> },
    { id: 12, name: translate("sidebar.internet"), svg: <InternetSvg /> },
    { id: 13, name: translate("sidebar.food"), svg: <FoodSvg /> },
  ];

  return (
    <nav className={`sidebar${accordion && showOnMobile ? " active" : ""}`}>
      {!showOnMobile && (
        <div className="sidebar__head SFPro-700">
          {translate("sidebar.checklistCategories")}
        </div>
      )}
      {!showOnMobile && (
        <ul className="sidebar__list">
          {categories.map((item) => (
            <li className="sidebar__item SFPro-700" key={item.id}>
              {item.type === "checkbox" && (
                <button
                  onClick={() => setActive(item.id)}
                  className={`sidebar__button${
                    item.id === active ? " active SFPro-600" : ""
                  }`}
                  type="button"
                >
                  {item.id === active && item.checked}
                  {item.id !== active && item.unChecked}
                  <span>{item.name}</span>
                </button>
              )}
              {item.type === "popular" && (
                <button
                  onClick={() => setActive(item.id)}
                  className={`sidebar__popular${
                    item.id === active ? " active" : ""
                  }`}
                  type="button"
                >
                  {item.svg && item.svg}
                  <span>{item.name}</span>
                </button>
              )}
              {!item.type && (
                <button
                  onClick={() => setActive(item.id)}
                  className={`sidebar__button${
                    item.id === active ? " active" : ""
                  }`}
                  type="button"
                >
                  {item.svg && item.svg}
                  <span>{item.name}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {showOnMobile && (
        <button
          onClick={() => setAccordion((prevState) => !prevState)}
          className="sidebar__head sidebar__head--accordion SFPro-600"
          type="button"
        >
          {translate("sidebar.checklistCategories")}
          <AccordionSvg />
        </button>
      )}
      <CSSTransition
        classNames="accordion"
        in={accordion}
        timeout={300}
        unmountOnExit
      >
        <ul className="sidebar__list">
          {categories.map((item) => (
            <li className="sidebar__item SFPro-700" key={item.id}>
              {item.type === "checkbox" && (
                <button
                  onClick={() => setActive(item.id)}
                  className={`sidebar__button${
                    item.id === active ? " active SFPro-600" : ""
                  }`}
                  type="button"
                >
                  {item.id === active && item.checked}
                  {item.id !== active && item.unChecked}
                  <span>{item.name}</span>
                </button>
              )}
              {item.type === "popular" && (
                <button
                  onClick={() => setActive(item.id)}
                  className={`sidebar__popular${
                    item.id === active ? " active" : ""
                  }`}
                  type="button"
                >
                  {item.svg && item.svg}
                  <span>{item.name}</span>
                </button>
              )}
              {!item.type && (
                <button
                  onClick={() => setActive(item.id)}
                  className={`sidebar__button${
                    item.id === active ? " active" : ""
                  }`}
                  type="button"
                >
                  {item.svg && item.svg}
                  <span>{item.name}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </CSSTransition>
    </nav>
  );
};

export default Sidebar;
