import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MyActiveChecklists from "../components/components/MyActiveChecklists/MyActiveChecklists";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const MyActiveChecklistsPage = () => {
  const { pathname } = useLocation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  return (
    <>
      <Helmet>
        <title>My active checklists</title>
        <meta property="og:title" content="My active checklists" />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="My active checklists" />
      </Helmet>
      <MyActiveChecklists />
    </>
  );
};

export default MyActiveChecklistsPage;
