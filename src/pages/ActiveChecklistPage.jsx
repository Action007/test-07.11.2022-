import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActiveChecklist from "../components/components/ActiveChecklist/ActiveChecklist";

const ActiveChecklistPage = () => {
  const token = useSelector((state) => state.isLoginSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/not-found");
  }, []);

  return <ActiveChecklist />;
};

export default ActiveChecklistPage;
