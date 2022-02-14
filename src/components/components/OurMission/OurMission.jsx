import React from "react";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./OurMission.scss";

import { ReactComponent as RocketImg } from "../../../assets/images/content/rocket.svg";

const OurMission = () => {
  const { t: translate } = useTranslation();

  const breadcrumbs = [{ title: translate("ourMissionPage.title") }];

  return (
    <div className="about pb-7">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="wrapper">
        <h2 className="mb-5 display-4 text-center SFPro-600">
          {translate("ourMissionPage.title")}
        </h2>
        <div className="about__img mb-5 mx-auto">
          <RocketImg />
        </div>
        <h3 className="display-6 SFPro-600">
          {translate("ourMissionPage.section1.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("ourMissionPage.section1.subtitle")}
        </span>
        <p className="about__text SFPro-300 display-7 mb-7">
          {translate("ourMissionPage.section1.text")}
        </p>
        <h3 className="display-6 SFPro-600">
          {translate("ourMissionPage.section2.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("ourMissionPage.section2.subtitle")}
        </span>
        <p className="about__text SFPro-300 display-7 mb-7">
          {translate("ourMissionPage.section2.text")}
        </p>
        <h3 className="display-6 SFPro-600">
          {translate("ourMissionPage.section3.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("ourMissionPage.section3.subtitle")}
        </span>
        <p className="about__text SFPro-300 display-7">
          {translate("ourMissionPage.section3.text")}
        </p>
      </div>
    </div>
  );
};

export default OurMission;
