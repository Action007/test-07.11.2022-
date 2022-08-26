import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router-dom";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./CategorySidebar.scss";

import { ReactComponent as ArrowSvg } from "../../../assets/images/icon/accordionArrow.svg";
import useChecklistCategories from "../../../hooks/useChecklistCategories";

const CategorySidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const [active, setActive] = useState("all");
  const [showAccordion, setShowAccordion] = useState(false);
  const { t: translate } = useTranslation();
  const { search } = useLocation();

  useEffect(() => {
    let category = "all";
    const categoryIds = searchParams.get("search_category_ids[]");
    const popular = search.match(/popular=true/g);
    const latest = search.match(/latest=true/g);

    if (categoryIds) {
      category = +categoryIds;
    } else if (popular) {
      category = "popular";
    } else if (latest) {
      category = "latest";
    } else {
      category = "all";
    }

    setActive(category);
  }, [search]);

  const onClickHandler = (id) => {
    setActive(id);
    setShowAccordion(false);
    searchParams.delete("page");
    searchParams.delete("search_category_ids[]");
    searchParams.delete("latest");
    searchParams.delete("popular");

    if (id === "all") {
      if (!search) {
        setSearchParams(`?per_page=5&page=1&${searchParams}`);
      } else {
        searchParams.append("page", 1);
        setSearchParams(searchParams);
      }
    }

    if (id === "popular" || id === "latest") {
      if (!search) {
        searchParams.append(id, true);
        setSearchParams(`?per_page=5&page=1&${searchParams}`);
      } else {
        searchParams.append("page", 1);
        searchParams.append(id, true);
        setSearchParams(searchParams);
      }
    }

    if (id !== "popular" && id !== "latest" && id !== "all") {
      if (!search) {
        searchParams.append("search_category_ids[]", id);
        setSearchParams(`?per_page=5&page=1&${searchParams}`);
      } else {
        searchParams.append("page", 1);
        searchParams.append("search_category_ids[]", id);
        setSearchParams(searchParams);
      }
    }
  };

  const sidebarBody = (
    <ul className="sidebar__list">
      {useChecklistCategories().map((item) => (
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
      {!showOnMobile && sidebarBody}
      {showOnMobile && (
        <div>
          <button
            onClick={() => setShowAccordion((prevState) => !prevState)}
            className={`sidebar__head SFPro-600${
              !showAccordion ? " close" : ""
            }`}
            type="button"
          >
            {translate("sidebar.checklistCategories")}
            <ArrowSvg />
          </button>
          <div className={`sidebar__body${!showAccordion ? " collapsed" : ""}`}>
            {sidebarBody}
          </div>
        </div>
      )}
    </nav>
  );
};

export default CategorySidebar;
