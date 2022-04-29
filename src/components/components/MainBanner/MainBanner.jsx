import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { heightForScrollActions } from "../../../store/heightForScrollSlice";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./MainBanner.scss";

import { ReactComponent as BannerImage } from "../../../assets/images/content/main-banner.svg";
import CreateButton from "../../UI/Buttons/CreateButton/CreateButton";

const MainBanner = () => {
  const dispatch = useDispatch();
  const showOnMobile = useMediaQuery("(max-width:991px)");
  const { t: translate } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    dispatch(heightForScrollActions.setHeight(ref.current.offsetHeight));
  }, []);

  return (
    <div className="main-banner" ref={ref}>
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
