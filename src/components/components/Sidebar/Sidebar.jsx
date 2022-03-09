import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Sidebar.scss";

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
import uniqueID from "../../../utils/uniqueId";

const Sidebar = () => {
  const [active, setActive] = useState(1);
  const { t: translate } = useTranslation();

  const categories = [
    { id: 0, name: translate("sidebar.selectAll"), type: "checkbox" },
    {
      id: 1,
      name: translate("sidebar.popular"),
      svg: <PopularSvg />,
      type: "active",
    },
    {
      id: 3,
      name: translate("sidebar.moreTags"),
      type: "tags",
      tags: [
        "javascript",
        "react",
        "ruby",
        "php",
        "python",
        "java",
        "c#",
        "html",
        "android",
        "c++",
        "css",
        "jquery",
      ],
    },
    { id: 4, name: translate("sidebar.printingHouse"), svg: <PrintingSvg /> },
    { id: 5, name: translate("sidebar.vocabulary"), svg: <VocabularySvg /> },
    { id: 6, name: translate("sidebar.space"), svg: <SpaceSvg /> },
    { id: 7, name: translate("sidebar.sport"), svg: <SportSvg /> },
    { id: 8, name: translate("sidebar.health"), svg: <HealthSvg /> },
    { id: 9, name: translate("sidebar.plants"), svg: <PlantsSvg /> },
    { id: 10, name: translate("sidebar.nature"), svg: <NatureSvg /> },
    { id: 11, name: translate("sidebar.music"), svg: <MusicSvg /> },
    { id: 12, name: translate("sidebar.cinema"), svg: <CinemaSvg /> },
    { id: 13, name: translate("sidebar.science"), svg: <ScienceSvg /> },
    { id: 14, name: translate("sidebar.internet"), svg: <InternetSvg /> },
    { id: 15, name: translate("sidebar.food"), svg: <FoodSvg /> },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar__head SFPro-700">
        {translate("sidebar.checklistCategories")}
      </div>
      <ul className="sidebar__list">
        {categories.map((item) => (
          <li className="sidebar__item SFPro-700" key={item.id}>
            {item.type === "checkbox" && (
              <label className="sidebar__label" htmlFor={item.id}>
                <input id={item.id} type="checkbox" />
                <span className="sidebar__checkmark" />
                <span className="sidebar__select">{item.name}</span>
              </label>
            )}
            {item.type === "tags" && (
              <div className="sidebar__tags SFPro-600">
                {item.tags.map((tag) => (
                  <button
                    className="sidebar__tag"
                    key={uniqueID()}
                    type="button"
                  >
                    {tag}
                  </button>
                ))}
                <button className="sidebar__more" type="button">
                  {item.name}
                </button>
              </div>
            )}
            {item.type === "active" && (
              <span className="sidebar__active">
                {item.svg && item.svg}
                <span>{item.name}</span>
              </span>
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
    </nav>
  );
};

export default Sidebar;
