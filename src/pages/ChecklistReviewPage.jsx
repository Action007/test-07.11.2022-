import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { checklistAPI } from "../services/checklistService";
import ChecklistReview from "../components/components/ChecklistReview/ChecklistReview";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const ChecklistDetailPage = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(1);
  const token = useSelector((state) => state.authSliceReducer.token);
  const {
    data: checklist,
    isError,
    error,
    isLoading,
    isFetching,
  } = checklistAPI.useFetchChecklistQuery(
    `/${
      token ? "checklists_auth" : "checklists"
    }/${id}?page=${pageCount}&per_page=5`
  );

  useEffect(() => {
    if (!isError) return;

    if (error && error?.data?.error === "not_found") {
      navigate("/not-found");
    } else {
      navigate("/error");
    }
  }, [isError]);

  return (
    <>
      <Helmet>
        <title>{checklist && checklist.checklist.name}</title>
        <meta
          property="og:title"
          content={checklist && checklist.checklist.name}
        />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="Checklist Review" />
        <meta property="og:description" content="Checklist Review" />
      </Helmet>
      <ChecklistReview
        checklist={checklist}
        setPageCount={setPageCount}
        id={id}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </>
  );
};
export default ChecklistDetailPage;
