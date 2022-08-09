import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createChecklistActions } from "../store/createChecklistSlice";
import { useFetchChecklistQuery } from "../services/checklistService";
import CreationOfChecklist from "../components/components/CreationOfChecklist/CreationOfChecklist";

const CreationOfChecklistPage = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: checklists,
    error,
    isLoading,
  } = useFetchChecklistQuery(`/checklists_auth/${id}?page=1&per_page=1`);
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
        <meta name="robots" content="noindex, nofollow" />
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
