import React from "react";
import { useNavigate } from "react-router-dom";
import useChecklistCategories from "../../../../hooks/useChecklistCategories";
import "./ChecklistCreatorAndCategory.scss";

import brokenImg from "../../../../assets/images/icon/brokenImg.svg";
import EmptySvg from "../../../../assets/images/icon/emptyPhoto.svg";

const ChecklistCreatorAndCategory = ({
  categoryID,
  creatorNickname,
  avatarUrl,
}) => {
  const navigate = useNavigate();

  const category = useChecklistCategories().find(
    // eslint-disable-next-line no-shadow
    (category) => category.id === categoryID
  );

  const onErrorImgHandler = (e) => {
    e.target.src = brokenImg;
    e.target.alt = "broken image";
  };

  const onCategoryClickHandler = () => {
    navigate(`/?per_page=5&page=1&search_category_ids[]=${categoryID}`);
  };

  const onNicknameClickHandler = () => {
    navigate(`/${creatorNickname}`);
  };

  return (
    <div className="creator-category">
      {!category.type && !category.fill && (
        <button
          onClick={onCategoryClickHandler}
          className="creator-category__inner"
          type="button"
        >
          <span className="creator-category__category stroke">
            {category.svg}
          </span>
          <span className="creator-category__name">{category.name}</span>
        </button>
      )}
      {category.fill && (
        <button
          onClick={onCategoryClickHandler}
          className="creator-category__inner"
          type="button"
        >
          <span className="creator-category__category fill">
            {category.svg}
          </span>
          <span className="creator-category__name">{category.name}</span>
        </button>
      )}
      <button
        onClick={onNicknameClickHandler}
        className="creator-category__inner"
        type="button"
      >
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
      </button>
    </div>
  );
};

export default ChecklistCreatorAndCategory;
