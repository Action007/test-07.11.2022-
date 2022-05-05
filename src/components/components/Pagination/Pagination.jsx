import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { navigationChecklistActions } from "../../../store/navigationChecklistSlice";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./Pagination.scss";

import { ReactComponent as PrevSvg } from "../../../assets/images/icon/prev.svg";
import { ReactComponent as NextSvg } from "../../../assets/images/icon/next.svg";
import { ReactComponent as LastPageSvg } from "../../../assets/images/icon/lastPage.svg";

const Pagination = ({
  count,
  currentPage,
  totalPage,
  prevPage,
  nextPage,
  page = false,
}) => {
  const height = useSelector((state) => state.heightForScrollReducer.height);
  const headerHeight = useSelector(
    (state) => state.heightForScrollReducer.headerHeight
  );
  const [activePage, setActivePage] = useState(currentPage);
  const showOnMobile = useMediaQuery("(max-width:550px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const perPage = 1;

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (page === "home") {
      navigate(`/?page=${activePage}&per_page=3`);
      dispatch(navigationChecklistActions.setPageValue(activePage));
    }
    if (!page) navigate(`?page=${activePage}&per_page=10`);
  }, [activePage]);

  const setPage = ({ selected }) => {
    window.scrollTo(0, height + headerHeight);
    setActivePage(selected * perPage + 1);
  };

  const onClickHandler = (type) => {
    if (type === "first") {
      if (prevPage) setActivePage(1);
    } else if (type === "last") {
      if (nextPage) setActivePage(totalPage);
    } else if (type === "prev") {
      if (prevPage) setActivePage(prevPage);
    } else if (type === "next") {
      if (nextPage) setActivePage(nextPage);
    }
  };

  return (
    <div className="paginate">
      {!showOnMobile && (
        <ReactPaginate
          initialPage={currentPage - 1}
          pageCount={count}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={setPage}
          containerClassName="pagination"
          activeClassName="active"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          pageClassName="page-item"
          breakClassName="page-item"
          nextClassName="page-item"
          previousClassName="page-item"
          previousLabel={<PrevSvg />}
          nextLabel={<NextSvg />}
        />
      )}
      {showOnMobile && (
        <div className="paginate__wrapper">
          <div className="paginate__inner">
            <button
              onClick={() => onClickHandler("first")}
              className={`paginate__first${!prevPage ? " disabled" : ""}`}
              type="button"
            >
              <LastPageSvg />
            </button>
            <button
              onClick={() => onClickHandler("prev")}
              className={`paginate__button${!prevPage ? " disabled" : ""}`}
              type="button"
            >
              <PrevSvg />
            </button>
          </div>
          <span className="paginate__desc SFPro-600">
            {currentPage} of {totalPage}
          </span>
          <div className="paginate__inner">
            <button
              onClick={() => onClickHandler("next")}
              className={`paginate__button${!nextPage ? " disabled" : ""}`}
              type="button"
            >
              <NextSvg />
            </button>
            <button
              onClick={() => onClickHandler("last")}
              className={`paginate__last${!nextPage ? " disabled" : ""}`}
              type="button"
            >
              <LastPageSvg />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
