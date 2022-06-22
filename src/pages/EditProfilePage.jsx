import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditProfile from "../components/components/EditProfile/EditProfile";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const MainPage = () => {
  const { pathname } = useLocation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Edit Profile</title>
        <meta property="og:title" content="Edit Profile" />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="Edit Profile" />
      </Helmet>
      <EditProfile />
    </>
  );
};

export default MainPage;
