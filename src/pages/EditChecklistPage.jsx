import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  } = checklistAPI.useFetchChecklistQuery(
    `/checklists_auth/${id}?page=1&per_page=1`
  );
  const token = useSelector((state) => state.authSliceReducer.token);

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  useEffect(() => {
    if (!id) return;
    if (isLoading) return;
    // eslint-disable-next-line consistent-return
    if (error) return navigate("/not-found");

    dispatch(createChecklistActions.editChecklist(checklists.checklist));
  }, [isLoading]);

  return (
    <CreationOfChecklist
      page="edit-checklist"
      id={id}
      checklists={!!checklists}
    />
  );
};

export default CreationOfChecklistPage;
