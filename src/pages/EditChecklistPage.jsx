import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../services/checklistService";
import { createChecklistActions } from "../store/createChecklistSlice";
import CreationOfChecklist from "../components/components/CreationOfChecklist/CreationOfChecklist";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const CreationOfChecklistPage = () => {
  const { t: translate } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: checklists,
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
    if (error) {
      navigate("/not-found");
      return;
    }

    dispatch(createChecklistActions.editChecklist(checklists.checklist));
  }, [isLoading]);

  return (
    <>
      <Helmet>
        <title>{translate("creationOfChecklist.edit")}</title>
        <meta property="og:title" content="Edit Checklist" />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="Edit Checklist" />
      </Helmet>
      <CreationOfChecklist
        page="edit-checklist"
        id={id}
        checklists={!!checklists}
      />
    </>
  );
};

export default CreationOfChecklistPage;
