import React from "react";
import "./Notification.scss";

const Notification = ({ translate, isError = false }) => {
  return (
    <div className={`notification SFPro-500${isError ? " error" : ""}`}>
      {translate}
    </div>
  );
};

export default Notification;
