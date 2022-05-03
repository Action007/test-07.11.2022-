import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyActiveChecklists from "../components/components/MyActiveChecklists/MyActiveChecklists";

const MyActiveChecklistsPage = () => {
  const token = useSelector((state) => state.isLoginSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/not-found");
  }, []);

  return <MyActiveChecklists />;
};

export default MyActiveChecklistsPage;
