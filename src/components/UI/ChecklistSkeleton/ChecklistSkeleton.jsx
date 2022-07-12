import React from "react";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./ChecklistSkeleton.scss";

const ChecklistSkeleton = () => {
  const showOnMobile = useMediaQuery("(max-width:575px)");

  return (
    <div className="loading-list">
      <div className="loading-list__wrapper">
        {showOnMobile && (
          <div className="loading-skeleton loading-list__skeleton--time" />
        )}
        <div className="loading-skeleton loading-list__skeleton--title" />
        <div className="loading-skeleton loading-list__skeleton--text" />
        <div className="loading-skeleton loading-list__skeleton--text" />
        <div className="loading-skeleton loading-list__skeleton--text" />
        <div className="loading-skeleton loading-list__skeleton--text" />
        <div className="loading-skeleton loading-list__skeleton--text" />
      </div>
      <div className="loading-list__tags">
        <div className="loading-skeleton loading-list__skeleton--tag" />
        <div className="loading-skeleton loading-list__skeleton--tag" />
        <div className="loading-skeleton loading-list__skeleton--tag" />
        <div className="loading-skeleton loading-list__skeleton--tag" />
        <div className="loading-skeleton loading-list__skeleton--tag" />
      </div>
      <div className="loading-list__wrap">
        <div className="loading-skeleton loading-list__skeleton--button" />
        <div className="loading-list__inner">
          <div className="loading-list__buttons">
            <div className="loading-skeleton loading-list__skeleton--btn" />
            <div className="loading-skeleton loading-list__skeleton--btn" />
          </div>
          {!showOnMobile && (
            <div className="loading-skeleton loading-list__skeleton--time" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChecklistSkeleton;
