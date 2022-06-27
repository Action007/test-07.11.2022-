import React from "react";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./TermsOfUse.scss";

import { ReactComponent as Example } from "../../../assets/images/content/terms-of-use.svg";

const TermOfUse = () => {
  const { t: translate } = useTranslation();
  const breadcrumbs = [{ title: translate("termOfUsePage.title") }];

  return (
    <section className="container term pb-8">
      <div className="container-wrapper">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h2 className="title--margin display-4 text-center SFPro-600">
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
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section1.text.part1")}
          <a
            className="term__link"
            href={window.location.origin}
            target="_blank"
            rel="noreferrer"
          >
            {window.location.hostname}
          </a>
          {translate("termOfUsePage.section1.text.part2")}
        </p>
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section1.text.part3")}
        </p>
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section1.text.part4")}
        </p>
        <p className="term__text SFPro-300 display-7">
          {translate("termOfUsePage.section1.text.part5")}
        </p>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section1.text.part6")}
        </p>
        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section2.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section2.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section2.text.part1")}
        </p>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section2.text.part2")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section3.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section3.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7">
          {translate("termOfUsePage.section3.text.part1")}
        </p>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section3.text.part2")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section4.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section4.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section4.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section5.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section5.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section5.text.part1")}
        </p>
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section5.text.part2")}
        </p>
        <ul className="term__list SFPro-300 display-7 mb-7">
          <li>{translate("termOfUsePage.section5.text.part3")}</li>
          <li>{translate("termOfUsePage.section5.text.part4")}</li>
          <li>{translate("termOfUsePage.section5.text.part5")}</li>
          <li>{translate("termOfUsePage.section5.text.part6")}</li>
          <li>{translate("termOfUsePage.section5.text.part7")}</li>
          <li>{translate("termOfUsePage.section5.text.part8")}</li>
          <li>{translate("termOfUsePage.section5.text.part9")}</li>
          <li>{translate("termOfUsePage.section5.text.part10")}</li>
          <li>{translate("termOfUsePage.section5.text.part11")}</li>
          <li>{translate("termOfUsePage.section5.text.part12")}</li>
          <li>{translate("termOfUsePage.section5.text.part13")}</li>
          <li>{translate("termOfUsePage.section5.text.part14")}</li>
          <li>{translate("termOfUsePage.section5.text.part15")}</li>
          <li>{translate("termOfUsePage.section5.text.part16")}</li>
          <li>{translate("termOfUsePage.section5.text.part17")}</li>
          <li>{translate("termOfUsePage.section5.text.part18")}</li>
          <li>{translate("termOfUsePage.section5.text.part19")}</li>
          <li>{translate("termOfUsePage.section5.text.part20")}</li>
          <li>{translate("termOfUsePage.section5.text.part21")}</li>
          <li>{translate("termOfUsePage.section5.text.part22")}</li>
          <li>{translate("termOfUsePage.section5.text.part23")}</li>
          <li>{translate("termOfUsePage.section5.text.part24")}</li>
          <li>{translate("termOfUsePage.section5.text.part25")}</li>
          <li>{translate("termOfUsePage.section5.text.part26")}</li>
        </ul>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section6.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section5.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section6.text.part1")}
        </p>
        <ul className="term__list SFPro-300 display-7 ">
          <li>{translate("termOfUsePage.section6.text.part2")}</li>
          <li>{translate("termOfUsePage.section6.text.part3")}</li>
          <li>{translate("termOfUsePage.section6.text.part4")}</li>
          <li>{translate("termOfUsePage.section6.text.part5")}</li>
          <li>{translate("termOfUsePage.section6.text.part6")}</li>
          <li>{translate("termOfUsePage.section6.text.part7")}</li>
          <li>{translate("termOfUsePage.section6.text.part8")}</li>
          <li>{translate("termOfUsePage.section6.text.part9")}</li>
          <li>{translate("termOfUsePage.section6.text.part10")}</li>
          <li>{translate("termOfUsePage.section6.text.part11")}</li>
          <li>{translate("termOfUsePage.section6.text.part12")}</li>
          <li>{translate("termOfUsePage.section6.text.part13")}</li>
          <li>{translate("termOfUsePage.section6.text.part14")}</li>
        </ul>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section6.text.part15")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section7.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section4.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section7.text.part1")}
        </p>
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section7.text.part2")}
        </p>
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section7.text.part3")}
        </p>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section7.text.part4")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section8.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section8.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section8.text.part1")}
        </p>
        <p className="term__text SFPro-300 display-7 mb-7 ">
          {translate("termOfUsePage.section8.text.part2")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section9.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section9.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section9.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section10.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section10.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section10.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section11.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section11.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section11.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section12.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section12.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section12.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section13.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section13.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section13.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section14.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section14.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section14.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section15.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section15.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section15.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section16.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section16.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section16.text.part1")}
        </p>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section16.text.part2")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section17.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section17.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7">
          {translate("termOfUsePage.section17.text.part1")}
        </p>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section17.text.part2")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section18.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section18.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section18.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section19.title")}
        </h3>
        <span className="mb-4 d-block SFPro-600 display-7">
          {translate("termOfUsePage.section19.subtitle1")}
        </span>
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section19.text1")}
        </p>
        <span className="mb-4 d-block SFPro-600 display-7">
          {translate("termOfUsePage.section19.subtitle2")}
        </span>
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section19.text2")}
        </p>
        <span className="mb-4 d-block SFPro-600 display-7">
          {translate("termOfUsePage.section19.subtitle3")}
        </span>
        <p className="term__text SFPro-300 display-7 ">
          {translate("termOfUsePage.section19.text3")}
        </p>
        <span className="mb-4 d-block SFPro-600 display-7">
          {translate("termOfUsePage.section19.subtitle4")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section19.text4")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section20.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section20.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section20.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section21.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section21.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section21.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section22.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section22.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section22.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section23.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section23.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section23.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section24.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section24.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section24.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section25.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section25.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section25.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section26.title")}
        </h3>
        <span className="mb-4 d-block SFPro-300 display-7">
          {translate("termOfUsePage.section26.subtitle")}
        </span>
        <p className="term__text SFPro-300 display-7 mb-7">
          {translate("termOfUsePage.section26.text.part1")}
        </p>

        <h3 className="display-6 SFPro-600">
          {translate("termOfUsePage.section27.title")}
        </h3>
        <p className="term__text SFPro-300 display-7">
          {translate("termOfUsePage.section27.text.part1")}
        </p>
        <p className="term SFPro-500 display-7 ">
          {translate("termOfUsePage.section27.text.companyName")}
        </p>
        <p className="term SFPro-500 display-7 ">
          {translate("termOfUsePage.section27.text.address")}
        </p>
        <p className="term SFPro-500 display-7 ">
          {translate("termOfUsePage.section27.text.addressCity")}
        </p>
        <p className="term SFPro-500 display-7 ">
          {translate("termOfUsePage.section27.text.phone")}
        </p>
        <p className="term__text SFPro-500 display-7 ">
          {translate("termOfUsePage.section27.text.email")}
        </p>
      </div>
    </section>
  );
};

export default TermOfUse;
