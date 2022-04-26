import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checklistAPI } from "../services/checklistService";
import { createChecklistActions } from "../store/createChecklistSlice";
import CreationOfChecklist from "../components/components/CreationOfChecklist/CreationOfChecklist";

const CreationOfChecklistPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: checklists,
    // eslint-disable-next-line no-unused-vars
    error,
    isLoading,
  } = checklistAPI.useFetchChecklistQuery(`/checklists_auth/${id}`);

  useEffect(() => {
    if (!id) return;
    if (isLoading) return;
    // eslint-disable-next-line consistent-return
    if (error) return navigate("/not-found");

    dispatch(createChecklistActions.editChecklist(checklists));
  }, [isLoading]);

  return <CreationOfChecklist edit id={id} checklists={!!checklists} />;
};

export default CreationOfChecklistPage;
