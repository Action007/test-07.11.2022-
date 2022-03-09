import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./MainBanner.scss";

import { ReactComponent as BannerImage } from "../../../assets/images/content/main-banner.svg";
import { ReactComponent as Plus } from "../../../assets/images/icon/plus.svg";

const MainBanner = () => {
  const { t: translate } = useTranslation();

  return (
    <section className="container main-banner">
      <div className="main-banner__wrap">
        <h2 className="main-banner__title SFPro-600">
          {translate("mainPage.title")}
        </h2>
        <Link to="/creation-of-checklist">
          <button className="main-banner__button SFPro-600" type="button">
            <Plus />
            {translate("mainPage.button")}
          </button>
        </Link>
      </div>
      <div className="main-banner__img">
        <BannerImage />
      </div>
    </section>
  );
};

export default MainBanner;
