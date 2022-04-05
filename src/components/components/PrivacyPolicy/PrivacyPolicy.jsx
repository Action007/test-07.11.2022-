import React from "react";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./PrivacyPolicy.scss";

import { ReactComponent as PrivacyImg } from "../../../assets/images/content/privacy-policy.svg";

const PrivacyPolicy = () => {
  const { t: translate } = useTranslation();

  const breadcrumbs = [{ title: translate("privacyPolicyPage.title") }];

  return (
    <div className="container policy pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container-wrapper">
        <h2 className="title--margin display-4 text-center SFPro-600">
          {translate("privacyPolicyPage.title")}
        </h2>
        <div className="policy__img mb-5 mx-auto">
          <PrivacyImg />
        </div>
        <h3 className="display-6 SFPro-600">
          {translate("privacyPolicyPage.section1.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("privacyPolicyPage.section1.subtitle")}
        </span>
        <p className="policy__text SFPro-300 display-7 mb-7">
          {translate("privacyPolicyPage.section1.text")}
        </p>
        <h3 className="display-6 SFPro-600">
          {translate("privacyPolicyPage.section2.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("privacyPolicyPage.section2.subtitle")}
        </span>
        <p className="policy__text SFPro-300 display-7 mb-7">
          {translate("privacyPolicyPage.section2.text")}
        </p>
        <h3 className="display-6 SFPro-600">
          {translate("privacyPolicyPage.section3.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("privacyPolicyPage.section3.subtitle")}
        </span>
        <p className="policy__text SFPro-300 display-7">
          {translate("privacyPolicyPage.section3.text")}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
