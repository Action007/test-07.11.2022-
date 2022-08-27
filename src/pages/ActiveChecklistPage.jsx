import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchActiveChecklistQuery } from "../services/activeChecklistService";
import ActiveChecklist from "../components/components/ActiveChecklist/ActiveChecklist";
import isServerError from "../utils/isServerError";

const ActiveChecklistPage = () => {
  const { id } = useParams();
  const {
    data: checklist,
    isFetching,
    isError,
    error,
  } = useFetchActiveChecklistQuery(`/active_checklists/${id}`, {
    refetchOnMountOrArgChange: true,
  });
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  return (
    <>
      <Helmet>
        <title>{checklist && checklist.entities.name}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <ActiveChecklist checklist={checklist} isFetching={isFetching} />
    </>
  );
};

export default ActiveChecklistPage;
