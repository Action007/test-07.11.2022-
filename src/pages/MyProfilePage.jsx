import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyProfile from "../components/components/MyProfile/MyProfile";

const ProfilePage = () => {
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  return <MyProfile />;
};

export default ProfilePage;
