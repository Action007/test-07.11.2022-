import React from "react";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./TermsOfUse.scss";

import { ReactComponent as Example } from "../../../assets/images/content/terms-of-use.svg";

const TermOfUse = () => {
  const { t: translate } = useTranslation();

  const breadcrumbs = [{ title: translate("termOfUsePage.title") }];

  return (
    <div className="term pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container-wrapper">
        <h2 className="mb-5 display-4 text-center SFPro-600">
          {translate("termOfUsePage.title")}
        </h2>
        <div className="term__img mb-5 mx-auto">
          <Example />
        </div>
        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section1.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section1.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section2.text")}
        </p>
        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section2.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section2.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section2.text")}
        </p>
        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section3.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section3.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7">
          {translate("termOfUsePage.section2.text")}
        </p>
      </div>
    </div>
  );
};

export default TermOfUse;
