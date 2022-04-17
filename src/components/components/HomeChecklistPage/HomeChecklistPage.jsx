import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checklistAPI } from "../../../services/checklistService";
import MainBanner from "../MainBanner/MainBanner";
import Sidebar from "../Sidebar/Sidebar";
import SearchInput from "../SearchInput/SearchInput";
import Checklist from "../Checklist/Checklist";
import Pagination from "../Pagination/Pagination";
import LoadingSkeleton from "../../UI/LoadingSkeleton/LoadingSkeleton";
import uniqueID from "../../../utils/uniqueID";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./HomeChecklistPage.scss";

import Logo from "../../../assets/images/content/logo.svg";
import CreateButton from "../../UI/Buttons/CreateButton/CreateButton";

const HomeChecklistPage = () => {
  const [pageValue, setPageValue] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const url = `/api/v1/checklists_auth?${searchValue}page=${pageValue}&per_page=3`;
  const {
    data: checklists,
    error,
    isFetching,
  } = checklistAPI.useFetchChecklistQuery(url);
  const { t: translate } = useTranslation();
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const onMobile = useMediaQuery("(max-width:1199px)");
  const navigate = useNavigate();
  // const { tag } = useParams();

  // useEffect(() => {
  //   if (!tag) return;
  //   const value = tag.replace(" ", "%20");

  //   setUrl(`/api/v1/tags/search?value=${value}`);
  // }, [tag]);

  const setValueHandler = (id) => {
    setPageValue(id);
  };

  const onSearchHandler = (value) => {
    setSearchValue(`search_value=${value}&`);
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
            <SearchInput searchHandler={onSearchHandler} />
            {showOnMobile && <Sidebar />}
            {isFetching && loader}
            {error && navigate("/error")}
            {checklists && !isFetching
              ? checklists.entities.map((checklist) => (
                  <Checklist
                    key={uniqueID()}
                    checklist={checklist}
                    translate={translate("allChecklistsPage.showMore")}
                  />
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
