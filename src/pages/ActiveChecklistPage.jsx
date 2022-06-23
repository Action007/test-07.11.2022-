import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { checklistAPI } from "../services/checklistService";
import ActiveChecklist from "../components/components/ActiveChecklist/ActiveChecklist";

const ActiveChecklistPage = () => {
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
      </Helmet>
      <ActiveChecklist checklist={checklist} isLoading={isLoading} />
    </>
  );
};

export default ActiveChecklistPage;
