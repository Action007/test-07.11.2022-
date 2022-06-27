import React from "react";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./OurMission.scss";

import { ReactComponent as OurMissionSvg } from "../../../assets/images/content/ourMission.svg";

const OurMission = () => {
  const { t: translate } = useTranslation();

  const breadcrumbs = [{ title: translate("ourMissionPage.title") }];

  return (
    <section className="container about pb-8">
      <div className="container-wrapper">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h2 className="title--margin display-4 text-center SFPro-600">
          {translate("ourMissionPage.title")}
        </h2>
        <div className="about__img mb-5 mx-auto">
          <OurMissionSvg />
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
    </section>
  );
};

export default OurMission;
