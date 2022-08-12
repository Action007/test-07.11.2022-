import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchChecklistQuery } from "../../../services/checklistService";
import MainBanner from "../MainBanner/MainBanner";
import CategorySidebar from "../CategorySidebar/CategorySidebar";
import SearchInput from "../SearchInput/SearchInput";
import Checklist from "../Checklist/Checklist";
import Pagination from "../Pagination/Pagination";
import ChecklistSkeleton from "../../UI/ChecklistSkeleton/ChecklistSkeleton";
import CreateButton from "../../UI/Buttons/CreateButton/CreateButton";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./HomeChecklistPage.scss";

import Logo from "../../../assets/images/content/logo.svg";

const HomeChecklistPage = () => {
  const { search } = useLocation();
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const onMobile = useMediaQuery("(max-width:1199px)");
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const ref = useRef();
  const {
    data: checklists,
    error,
    isFetching,
  } = useFetchChecklistQuery(
    `/${token ? "checklists_auth" : "checklists"}${
      search || "?page=1&per_page=5"
    }`,
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (search) {
      if (search === "?page=1&per_page=5") return;
      ref.current.scrollIntoView();
      if (onMobile) {
        if (token) {
          window.scrollBy(0, -160);
        } else {
          window.scrollBy(0, -100);
        }
      } else {
        window.scrollBy(0, -188);
      }
    }
  }, [search]);

  useEffect(() => {
    if (error) navigate("/error");
  }, [error]);

  const loader = (
    <>
      <ChecklistSkeleton />
      <ChecklistSkeleton />
      <ChecklistSkeleton />
      <ChecklistSkeleton />
      <ChecklistSkeleton />
    </>
  );

  return (
    <>
      <h1 className="sr-only">This is our home page</h1>
      {!token && <MainBanner />}
      <div className={token ? "main-content user" : "main-content"} ref={ref}>
        <div className="container main-content__wrapper">
          {!showOnMobile && <CategorySidebar />}
          <div className="main-content__wrap">
            <h3 className="main-content__title">
              {translate("mainPage.popularQuestion")}
            </h3>
            <SearchInput page="home" />
            {showOnMobile && <CategorySidebar />}
            {isFetching && loader}
            {checklists &&
              !isFetching &&
              checklists.entities.map((checklist) => (
                <Checklist
                  key={checklist.id}
                  checklist={checklist}
                  page="home"
                />
              ))}
            {checklists && checklists.entities.length === 0 && !isFetching && (
              <span className="main-content__text">
                {translate("mainPage.notFound")}
              </span>
            )}
            {checklists && checklists.paginate.total_pages > 1 && (
              <Pagination
                count={checklists.paginate.total_pages}
                currentPage={checklists.paginate.current_page}
                totalPage={checklists.paginate.total_pages}
                prevPage={checklists.paginate.prev_page}
                nextPage={checklists.paginate.next_page}
                page="home"
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
