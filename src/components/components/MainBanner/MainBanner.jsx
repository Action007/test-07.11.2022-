import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./MainBanner.scss";

import { ReactComponent as BannerImage } from "../../../assets/images/content/main-banner.svg";
import CreateButton from "../../UI/Buttons/CreateButton/CreateButton";

const MainBanner = () => {
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const { t: translate } = useTranslation();

  return (
    <div className="container main-banner">
      <div className="main-banner__wrap">
        <h2 className="main-banner__title SFPro-600">
          {translate("mainPage.title")}
        </h2>
        {showOnMobile && (
          <div className="main-banner__img">
            <BannerImage />
          </div>
        )}
        <Link className="main-banner__link" to="/creation-of-checklist">
          <CreateButton />
        </Link>
      </div>
      {!showOnMobile && (
        <div className="main-banner__img">
          <BannerImage />
        </div>
      )}
    </div>
  );
};

export default MainBanner;
