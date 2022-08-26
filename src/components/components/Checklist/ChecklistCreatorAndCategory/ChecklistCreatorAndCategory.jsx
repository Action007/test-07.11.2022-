import React from "react";
import useChecklistCategories from "../../../../hooks/useChecklistCategories";
import "./ChecklistCreatorAndCategory.scss";

import brokenImg from "../../../../assets/images/icon/brokenImg.svg";
import EmptySvg from "../../../../assets/images/icon/emptyPhoto.svg";

const ChecklistCreatorAndCategory = ({
  categoryID,
  creatorNickname,
  avatarUrl,
}) => {
  const onErrorImgHandler = (e) => {
    e.target.src = brokenImg;
    e.target.alt = "broken image";
  };

  const category = useChecklistCategories().find(
    // eslint-disable-next-line no-shadow
    (category) => category.id === categoryID
  );

  return (
    <div className="creator-category">
      {!category.type && !category.fill && (
        <div className="creator-category__inner">
          <span className="creator-category__category stroke">
            {category.svg}
          </span>
          <span className="creator-category__name">{category.name}</span>
        </div>
      )}
      {category.fill && (
        <div className="creator-category__inner">
          <span className="creator-category__category fill">
            {category.svg}
          </span>
          <span className="creator-category__name">{category.name}</span>
        </div>
      )}
      <div className="creator-category__inner">
        <div className="creator-category__image">
          {avatarUrl ? (
            <img
              className="creator-category__profile"
              onError={onErrorImgHandler}
              src={avatarUrl}
              alt="account"
            />
          ) : (
            <img
              className="creator-category__empty"
              src={EmptySvg}
              alt="account"
            />
          )}
        </div>
        <span className="creator-category__nickname">{creatorNickname}</span>
      </div>
    </div>
  );
};

export default ChecklistCreatorAndCategory;
