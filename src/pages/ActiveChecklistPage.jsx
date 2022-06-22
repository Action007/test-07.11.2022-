import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { checklistAPI } from "../services/checklistService";
import ActiveChecklist from "../components/components/ActiveChecklist/ActiveChecklist";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const ActiveChecklistPage = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { data: checklist, isLoading } =
    checklistAPI.useFetchActiveChecklistQuery(`/active_checklists/${id}`);
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  return (
    <>
      <Helmet>
        <title>{checklist && checklist.entities.name}</title>
        <meta
          property="og:title"
          content={checklist && checklist.entities.name}
        />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="Active Checklist" />
      </Helmet>
      <ActiveChecklist checklist={checklist} isLoading={isLoading} />
    </>
  );
};

export default ActiveChecklistPage;
