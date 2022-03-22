import React from "react";
import ReactPaginate from "react-paginate";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./Pagination.scss";

import { ReactComponent as PrevSvg } from "../../../assets/images/icon/prev.svg";
import { ReactComponent as NextSvg } from "../../../assets/images/icon/next.svg";
import { ReactComponent as LastPageSvg } from "../../../assets/images/icon/lastPage.svg";

const Pagination = ({
  count,
  setValue,
  currentPage,
  totalPage,
  prevPage,
  nextPage,
}) => {
  const showOnMobile = useMediaQuery("(max-width:480px)");
  const perPage = 1;

  const setPage = ({ selected }) => {
    window.scrollTo(0, 0);
    setValue(selected * perPage + 1);
  };

  const onClickHandler = (type) => {
    if (type === "first") {
      if (!prevPage) return;
      setValue(1);
      window.scrollTo(0, 0);
    } else if (type === "last") {
      if (!nextPage) return;
      setValue(totalPage);
      window.scrollTo(0, 0);
    } else if (type === "prev") {
      if (!prevPage) return;
      setValue(prevPage);
      window.scrollTo(0, 0);
    } else if (type === "next") {
      if (!nextPage) return;
      setValue(nextPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="paginate">
      {!showOnMobile && (
        <ReactPaginate
          pageCount={count}
          pageRangeDisplayed={1}
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
