import React from "react";
import { Link } from "react-router-dom";

const HomeButton = ({ text }) => {
  return (
    <Link to="/" className="checklist-button SFPro-600" type="button">
      {text}
    </Link>
  );
};

export default HomeButton;
