import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AllChecklists from "../components/components/AllChecklists/AllChecklists";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const AllCheckListsPage = () => {
  const { pathname } = useLocation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  return (
    <>
      <Helmet>
        <title>All checklists</title>
        <meta property="og:title" content="All checklist" />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="All checklist" />
      </Helmet>
      <AllChecklists />
    </>
  );
};

export default AllCheckListsPage;
