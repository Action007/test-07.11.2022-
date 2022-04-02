import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checklistAPI } from "../services/checklistService";
import CreationOfChecklist from "../components/components/CreationOfChecklist/CreationOfChecklist";
import { createChecklistActions } from "../store/createChecklistSlice";

const CreationOfChecklistPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: checklists, isLoading } = checklistAPI.useFetchChecklistQuery(
    `/api/v1/checklists_auth/${id}`
  );

  useEffect(() => {
    if (!id) return;
    if (isLoading) return;

    dispatch(createChecklistActions.editChecklist(checklists));
  }, [isLoading]);

  return <CreationOfChecklist />;
};

export default CreationOfChecklistPage;
