import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CreationOfChecklist from "../components/components/CreationOfChecklist/CreationOfChecklist";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const CreationOfChecklistPage = () => {
  const { pathname } = useLocation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Creation of Checklist</title>
        <meta property="og:title" content="Creation of Checklist" />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="Creation of Checklist" />
      </Helmet>
      <CreationOfChecklist />
    </>
  );
};

export default CreationOfChecklistPage;
