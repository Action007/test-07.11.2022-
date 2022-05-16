import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
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
  url,
}) => {
  const showOnMobile = useMediaQuery("(max-width:550px)");
  const navigate = useNavigate();
  const perPage = 1;

  const searchValue = useSelector(
    (state) => state.navigationChecklistReducer.searchValue
  );
  const categoryValue = useSelector(
    (state) => state.navigationChecklistReducer.categoryValue
  );
  const tagValue = useSelector(
    (state) => state.navigationChecklistReducer.tagValue
  );
  const popularValue = useSelector(
    (state) => state.navigationChecklistReducer.popularValue
  );
  const latestValue = useSelector(
    (state) => state.navigationChecklistReducer.latestValue
  );

  const setPage = ({ selected }) => {
    if (page === "home") {
      navigate(
        `/?${searchValue}${
          searchValue && (latestValue || popularValue) ? "&" : ""
        }${popularValue}${latestValue}${
          latestValue || popularValue ? "&" : ""
        }page=${selected * perPage + 1}&per_page=3${tagValue}${categoryValue}`
      );
    } else {
      navigate(`?${url}&page=${selected * perPage + 1}&per_page=10`);
      window.scrollTo(0, 0);
    }
  };

  const onClickHandler = (type) => {
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

    if (page === "home") {
      navigate(
        `/?${searchValue}${
          searchValue && (latestValue || popularValue) ? "&" : ""
        }${popularValue}${latestValue}${
          latestValue || popularValue ? "&" : ""
        }page=${changePage}&per_page=3${tagValue}${categoryValue}`
      );
    } else {
      navigate(`?${url}&page=${changePage}&per_page=10`);
      window.scrollTo(0, 0);
    }
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
