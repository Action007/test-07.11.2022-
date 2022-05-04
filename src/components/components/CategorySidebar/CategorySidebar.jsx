import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Accordion } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { navigationChecklistActions } from "../../../store/navigationChecklistSlice";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./CategorySidebar.scss";

import { ReactComponent as UnChecked } from "../../../assets/images/icon/unChecked.svg";
import { ReactComponent as Checked } from "../../../assets/images/icon/checked.svg";
import { ReactComponent as PopularSvg } from "../../../assets/images/icon/popular.svg";
import { ReactComponent as LatestSvg } from "../../../assets/images/icon/latests.svg";
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
import { ReactComponent as DotsSvg } from "../../../assets/images/icon/dots.svg";

const CategorySidebar = () => {
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const [active, setActive] = useState("all");
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const pageValue = useSelector(
    (state) => state.navigationChecklistReducer.pageValue
  );
  const searchValue = useSelector(
    (state) => state.navigationChecklistReducer.searchValue
  );
  const tagValue = useSelector(
    (state) => state.navigationChecklistReducer.tagValue
  );
  const dispatch = useDispatch();
  const { search } = useLocation();

  const categories = [
    {
      id: "all",
      name: translate("sidebar.selectAll"),
      unChecked: <UnChecked />,
      checked: <Checked />,
      type: "checkbox",
    },
    {
      id: -1,
      name: translate("sidebar.popular"),
      svg: <PopularSvg />,
      type: "popular",
    },
    {
      id: 0,
      name: translate("sidebar.latests"),
      svg: <LatestSvg />,
    },
    {
      id: 1,
      name: translate("sidebar.animals"),
      svg: <AnimalsSvg />,
      fill: true,
    },
    {
      id: 2,
      name: translate("sidebar.art"),
      svg: <ArtSvg />,
      fill: true,
    },
    {
      id: 3,
      name: translate("sidebar.beauty"),
      svg: <BeautySvg />,
      fill: true,
    },
    { id: 4, name: translate("sidebar.books"), svg: <BooksSvg /> },
    { id: 5, name: translate("sidebar.work"), svg: <WorkSvg /> },
    { id: 6, name: translate("sidebar.cars"), svg: <CarsSvg /> },
    {
      id: 7,
      name: translate("sidebar.children"),
      svg: <ChildrenSvg />,
      fill: true,
    },
    { id: 8, name: translate("sidebar.dating"), svg: <DatingSvg /> },
    { id: 9, name: translate("sidebar.education"), svg: <EducationSvg /> },
    {
      id: 10,
      name: translate("sidebar.entertainment"),
      svg: <EntertainmentSvg />,
      fill: true,
    },
    { id: 11, name: translate("sidebar.finance"), svg: <FinanceSvg /> },
    { id: 12, name: translate("sidebar.food"), svg: <FoodSvg /> },
    {
      id: 13,
      name: translate("sidebar.health"),
      svg: <HealthSvg />,
      fill: true,
    },
    { id: 14, name: translate("sidebar.home"), svg: <HomeSvg /> },
    { id: 15, name: translate("sidebar.music"), svg: <MusicSvg /> },
    { id: 16, name: translate("sidebar.nature"), svg: <NatureSvg /> },
    {
      id: 17,
      name: translate("sidebar.social"),
      svg: <SocialSvg />,
      fill: true,
    },
    { id: 18, name: translate("sidebar.sport"), svg: <SportSvg /> },
    { id: 19, name: translate("sidebar.travel"), svg: <TravelSvg /> },
    { id: 20, name: translate("sidebar.other"), svg: <DotsSvg />, fill: true },
  ];

  useEffect(() => {
    const category = search.match(/&search_category_ids\[\]=(\d+)/g);
    if (!category) return;
    const [id] = category[0].match(/\d+/g);
    setActive(+id);
  }, []);

  const onClickHandler = (id) => {
    setActive(id);
    if (id === "all") {
      navigate(`/?${searchValue}page=${pageValue}&per_page=3${tagValue}`);
    } else {
      dispatch(navigationChecklistActions.setCategoryID(id));
      navigate(
        `/?${searchValue}page=${pageValue}&per_page=3${tagValue}&search_category_ids[]=${id}`
      );
    }
  };

  const sidebarBody = (
    <ul className="sidebar__list">
      {categories.map((item) => (
        <li className="sidebar__item SFPro-500" key={item.id}>
          {item.type === "checkbox" && (
            <button
              onClick={() => onClickHandler(item.id)}
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
              onClick={() => onClickHandler(item.id)}
              className={`sidebar__popular${item.id === active ? " hot" : ""}`}
              type="button"
            >
              {item.svg && item.svg}
              <span>{item.name}</span>
            </button>
          )}
          {!item.type && !item.fill && (
            <button
              onClick={() => onClickHandler(item.id)}
              className={`sidebar__button sidebar__button--stroke${
                item.id === active ? " active" : ""
              }`}
              type="button"
            >
              {item.svg && item.svg}
              <span>{item.name}</span>
            </button>
          )}
          {item.fill && (
            <button
              onClick={() => onClickHandler(item.id)}
              className={`sidebar__button sidebar__button--fill${
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
  );

  return (
    <nav className="sidebar">
      {!showOnMobile && (
        <div className="sidebar__head SFPro-700">
          {translate("sidebar.checklistCategories")}
        </div>
      )}
      {!showOnMobile && sidebarBody}
      {showOnMobile && (
        <Accordion>
          <Accordion.Header className="sidebar__head sidebar__head--accordion SFPro-600">
            {translate("sidebar.checklistCategories")}
          </Accordion.Header>
          <Accordion.Body>{sidebarBody}</Accordion.Body>
        </Accordion>
      )}
    </nav>
  );
};

export default CategorySidebar;
