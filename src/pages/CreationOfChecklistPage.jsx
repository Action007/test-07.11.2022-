import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CreationOfChecklist from "../components/components/CreationOfChecklist/CreationOfChecklist";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const CreationOfChecklistPage = () => {
  const { t: translate } = useTranslation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  return (
    <>
      <Helmet>
        <title>{translate("creationOfChecklist.title")}</title>
      </Helmet>
      <CreationOfChecklist />
    </>
  );
};

export default CreationOfChecklistPage;
