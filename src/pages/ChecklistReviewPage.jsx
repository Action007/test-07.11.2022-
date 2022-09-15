import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFetchChecklistQuery } from "../services/checklistService";
import { HOSTNAME } from "../services";
import ChecklistReview from "../components/components/ChecklistReview/ChecklistReview";
import isServerError from "../utils/isServerError";

const ChecklistDetailPage = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authSliceReducer.token);
  const {
    data: checklist,
    isError,
    error,
    isFetching,
  } = useFetchChecklistQuery(
    `/${token ? "checklists_auth" : "checklists"}/${id}?page=1&per_page=5`,
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (!isError) return;

    if (error && error?.data?.error === "not_found") {
      navigate("/not-found", { replace: true });
      return;
    }
    if (isServerError(error?.status)) {
      navigate("/error", { replace: true });
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
        <meta property="og:url" content={HOSTNAME + pathname} />
        <meta name="description" content="Checklist Review" />
        <meta property="og:description" content="Checklist Review" />
      </Helmet>
      <ChecklistReview checklist={checklist} id={id} isFetching={isFetching} />
    </>
  );
};
export default ChecklistDetailPage;
