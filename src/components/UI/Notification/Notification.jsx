import React, { useEffect } from "react";
import "./Notification.scss";

const Notification = ({ translate, isError = false }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={`notification SFPro-500${isError ? " error" : ""}`}>
      {translate}
    </div>
  );
};

export default Notification;
