import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllChecklists from "../components/components/AllChecklists/AllChecklists";

const AllCheckListsPage = () => {
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/not-found");
  }, []);

  return <AllChecklists />;
};

export default AllCheckListsPage;
