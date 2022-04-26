import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { checklistAPI } from "../../../services/checklistService";
import MainBanner from "../MainBanner/MainBanner";
import Sidebar from "../Sidebar/Sidebar";
import SearchInput from "../SearchInput/SearchInput";
import Checklist from "../Checklist/Checklist";
import Pagination from "../Pagination/Pagination";
import LoadingSkeleton from "../../UI/LoadingSkeleton/LoadingSkeleton";
import CreateButton from "../../UI/Buttons/CreateButton/CreateButton";
import useMediaQuery from "../../../hooks/useMediaQuery";
import uniqueID from "../../../utils/uniqueID";
import "./HomeChecklistPage.scss";

import Logo from "../../../assets/images/content/logo.svg";

const HomeChecklistPage = () => {
  const [pageValue, setPageValue] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const url = `/checklists_auth?${searchValue}page=${pageValue}&per_page=3${tagValue}${categoryValue}`;
  const {
    data: checklists,
    error,
    isFetching,
  } = checklistAPI.useFetchChecklistQuery(url);
  const { t: translate } = useTranslation();
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const onMobile = useMediaQuery("(max-width:1199px)");
  const navigate = useNavigate();
  const { tagID } = useParams();

  // should be category ids
  useEffect(() => {
    if (!tagID) setTagValue("");
    if (tagID) {
      setCategoryValue(`&search_category_ids[]=${tagID}`);
      setPageValue(1);
      setSearchValue("");
      window.scrollTo(0, 0);
    }
  }, [tagID]);

  useEffect(() => {
    if (!tagID) setTagValue("");
    if (tagID) {
      setTagValue(`&search_tag_ids[]=${tagID}`);
      setPageValue(1);
      setSearchValue("");
      window.scrollTo(0, 0);
    }
  }, [tagID]);

  useEffect(() => {
    if (error) navigate("/error");
  }, [error]);

  const setValueHandler = (id) => {
    setPageValue(id);
  };

  const onSearchHandler = (value) => {
    setSearchValue(`search_value=${value}&`);
    setPageValue(1);
    setTagValue("");
  };

  const loader = (
    <>
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </>
  );

  return (
    <>
      <MainBanner />
      <div className="main-content">
        <div className="container main-content__wrapper">
          {!showOnMobile && <Sidebar />}
          <div className="main-content__wrap">
            <h3 className="main-content__title">
              {!showOnMobile && translate("mainPage.popularQuestion")}
              {showOnMobile && translate("mainPage.search")}
            </h3>
            <SearchInput searchHandler={onSearchHandler} page="home" />
            {showOnMobile && <Sidebar />}
            {isFetching && loader}
            {checklists && !isFetching
              ? checklists.entities.map((checklist) => (
                  <Checklist key={uniqueID()} checklist={checklist} />
                ))
              : ""}
            {checklists?.entities.length === 0 && (
              <span className="main-content__text">
                {translate("mainPage.notFound")}
              </span>
            )}
            {checklists && checklists.paginate.total_pages > 1 && (
              <Pagination
                count={checklists.paginate.total_pages}
                setValue={setValueHandler}
                currentPage={checklists.paginate.current_page}
                totalPage={checklists.paginate.total_pages}
                prevPage={checklists.paginate.prev_page}
                nextPage={checklists.paginate.next_page}
              />
            )}
          </div>
        </div>
        <div className="main-content__inner">
          <div className="main-content__container">
            <div className="main-content__box">
              <div className="main-content__img">
                <img src={Logo} alt="logotype" />
              </div>
              <h3 className="main-content__heading SFPro-600">
                {translate("mainPage.heading")}
              </h3>
              <p className="main-content__desc">{translate("mainPage.desc")}</p>
              {onMobile && (
                <div className="main-content__images">
                  <span className="main-content__image" />
                  <span className="main-content__image" />
                  <span className="main-content__image" />
                  <span className="main-content__image" />
                </div>
              )}
              <CreateButton />
            </div>
            {!onMobile && (
              <div className="main-content__images">
                <span className="main-content__image" />
                <span className="main-content__image" />
                <span className="main-content__image" />
                <span className="main-content__image" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeChecklistPage;
