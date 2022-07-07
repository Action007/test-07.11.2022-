import React from "react";
import { useTranslation } from "react-i18next";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./MainBanner.scss";

import { ReactComponent as BannerImage } from "../../../assets/images/content/main-banner.svg";
import CreateButton from "../../UI/Buttons/CreateButton/CreateButton";

const MainBanner = () => {
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const { t: translate } = useTranslation();

  return (
    <section className="main-banner">
      <div className="main-banner__wrap">
        <h1 className="main-banner__title SFPro-600">
          {translate("mainPage.title")}
        </h1>
        {showOnMobile && (
          <div className="main-banner__img">
            <BannerImage />
          </div>
        )}
        <div className="d-inline-block">
          <CreateButton />
        </div>
      </div>
      {!showOnMobile && (
        <div className="main-banner__img">
          <BannerImage />
        </div>
      )}
    </section>
  );
};

export default MainBanner;
