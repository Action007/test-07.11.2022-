import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Notification.scss";

const Notification = ({
  translate,
  isError = false,
  link = false,
  isComplain,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isComplain) return;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  if (link) {
    return (
      <button
        onClick={() => navigate(link)}
        className={`notification button SFPro-500${isError ? " error" : ""} `}
        type="button"
      >
        {translate}
      </button>
    );
  }

  return (
    <div className={`notification SFPro-500${isError ? " error" : ""}`}>
      {translate}
    </div>
  );
};

export default Notification;
