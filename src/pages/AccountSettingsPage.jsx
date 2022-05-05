import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountSetting from "../components/components/AccountSetting/AccountSetting";

const AccountSettingsPage = () => {
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  return <AccountSetting />;
};

export default AccountSettingsPage;
