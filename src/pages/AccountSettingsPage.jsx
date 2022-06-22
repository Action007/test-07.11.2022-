import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AccountSetting from "../components/components/AccountSetting/AccountSetting";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const AccountSettingsPage = () => {
  const { pathname } = useLocation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Account Settings</title>
        <meta property="og:title" content="Account Settings" />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="Account Settings" />
      </Helmet>
      <AccountSetting />
    </>
  );
};

export default AccountSettingsPage;
