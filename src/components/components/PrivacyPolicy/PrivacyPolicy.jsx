import React from "react";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./PrivacyPolicy.scss";

import { ReactComponent as PrivacyImg } from "../../../assets/images/content/privacy-policy.svg";

const PrivacyPolicy = () => {
  const { t: translate } = useTranslation();

  const breadcrumbs = [{ title: translate("privacyPolicyPage.title") }];

  return (
    <section className="container policy pb-8">
      <div className="container-wrapper">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1 className="title--margin display-4 text-center SFPro-600">
          {translate("privacyPolicyPage.title")}
        </h1>
        <div className="policy__img mb-5 mx-auto">
          <PrivacyImg />
        </div>
        <h2 className="sr-only">{translate("privacyPolicyPage.h2")}</h2>
        <h3 className="display-6 SFPro-600">
          {translate("privacyPolicyPage.section1.title")}
        </h3>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
