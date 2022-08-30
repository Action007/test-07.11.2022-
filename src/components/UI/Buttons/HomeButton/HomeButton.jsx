import React from "react";
import { useNavigate } from "react-router-dom";

const HomeButton = ({ text }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="checklist-button SFPro-600"
      type="button"
    >
      {text}
    </button>
  );
};

export default HomeButton;
