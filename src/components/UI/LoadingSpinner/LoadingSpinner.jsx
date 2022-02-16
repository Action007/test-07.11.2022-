import React from "react";
import scss from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => (
  <div className={scss.wrap}>
    <div className={scss.spinner} />
  </div>
);

export default LoadingSpinner;
