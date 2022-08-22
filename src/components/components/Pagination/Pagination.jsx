import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { changeSearchParamsValue } from "../../../utils/searchParamsValue";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();
  const showOnMobile = useMediaQuery("(max-width:550px)");
  const perPage = 1;

  const setPage = ({ selected }) => {
    if (!search) {
      setSearchParams(`?per_page=5&page=${selected * perPage + 1}`);
    } else {
      setSearchParams(
        changeSearchParamsValue(
          searchParams,
          "page",
          selected * perPage + 1,
          false
        )
      );
    }
    if (page !== "home") window.scrollTo(0, 0);
  };

  const onClickHandler = (type) => {
    return () => {
      let changePage;

      if (type === "first") {
        if (prevPage) changePage = 1;
      } else if (type === "last") {
        if (nextPage) changePage = totalPage;
      } else if (type === "prev") {
        if (prevPage) changePage = prevPage;
      } else if (type === "next") {
        if (nextPage) changePage = nextPage;
      }

      if (!search) {
        setSearchParams(`?per_page=5&page=${changePage}`);
      } else {
        setSearchParams(
          changeSearchParamsValue(searchParams, "page", changePage, false)
        );
      }
      if (page !== "home") window.scrollTo(0, 0);
    };
  };

  return (
    <div className="paginate">
      {!showOnMobile && (
        <ReactPaginate
          forcePage={currentPage - 1}
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
              onClick={onClickHandler("first")}
              className={`paginate__first${!prevPage ? " disabled" : ""}`}
              type="button"
            >
              <LastPageSvg />
            </button>
            <button
              onClick={onClickHandler("prev")}
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
              onClick={onClickHandler("next")}
              className={`paginate__button${!nextPage ? " disabled" : ""}`}
              type="button"
            >
              <NextSvg />
            </button>
            <button
              onClick={onClickHandler("last")}
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
