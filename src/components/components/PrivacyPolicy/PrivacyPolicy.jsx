/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./PrivacyPolicy.scss";

import { ReactComponent as PrivacyImg } from "../../../assets/images/content/privacy-policy.svg";

const PrivacyPolicy = () => {
  const { pathname, hash, key } = useLocation();
  const { t: translate } = useTranslation();
  const breadcrumbs = [{ title: translate("privacyPolicyPage.title") }];

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
        window.scrollBy(0, -110);
      }
    }
  }, [pathname, hash, key]);

  return (
    <section className="policy container pb-8 display-7">
      <div className="container-wrapper">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <ul>
          <li className="mb-5">
            <h1 className="title--margin display-4 text-center SFPro-600">
              {translate("privacyPolicyPage.title")}
            </h1>
            <div className="policy__img mb-5 mx-auto">
              <PrivacyImg />
            </div>
            <h2 className="sr-only">{translate("privacyPolicyPage.h2")}</h2>
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section1.title")}
            </h3>
            <h4 className="policy__subtitle SFPro-600">
              {translate("privacyPolicyPage.section1.subtitle1")}
            </h4>
            <div className="policy__texts">
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section1.desc"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p>{translate("privacyPolicyPage.section1.text1")}</p>
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section1.text2"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
            </div>
            <ul className="policy__list mb-2">
              <li>{translate("privacyPolicyPage.section1.item1")}</li>
              <li>{translate("privacyPolicyPage.section1.item2")}</li>
              <li>{translate("privacyPolicyPage.section1.item3")}</li>
              <li>{translate("privacyPolicyPage.section1.item4")}</li>
              <li>{translate("privacyPolicyPage.section1.item5")}</li>
              <li>{translate("privacyPolicyPage.section1.item6")}</li>
              <li>{translate("privacyPolicyPage.section1.item7")}</li>
              <li>{translate("privacyPolicyPage.section1.item8")}</li>
              <li>{translate("privacyPolicyPage.section1.item9")}</li>
              <li>{translate("privacyPolicyPage.section1.item10")}</li>
              <li>{translate("privacyPolicyPage.section1.item11")}</li>
            </ul>
            <div>
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section1.text3"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p className="mb-4">
                <Trans
                  i18nKey="privacyPolicyPage.section1.text4"
                  t={translate}
                  components={[
                    <span className="SFPro-600" />,
                    <Link
                      className="policy__link"
                      to={{
                        hash: "#handleLogins",
                      }}
                    />,
                  ]}
                />
              </p>
              <p className="mb-4">
                {translate("privacyPolicyPage.section1.text5")}
              </p>
            </div>
            <h4 className="policy__subtitle">
              <Trans
                i18nKey="privacyPolicyPage.section1.subtitle2"
                t={translate}
                components={[<span className="SFPro-600" />]}
              />
            </h4>
            <div>
              <p className="mb-4">
                <Trans
                  i18nKey="privacyPolicyPage.section1.text6"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p className="mb-4">
                {translate("privacyPolicyPage.section1.text7")}
              </p>
              <p className="mb-4">
                {translate("privacyPolicyPage.section1.text8")}
              </p>
            </div>
            <span className="d-block mb-3">
              {translate("privacyPolicyPage.section1.text9")}
            </span>
            <ul className="policy__list mb-2">
              <li>{translate("privacyPolicyPage.section1.item13")}</li>
              <li>{translate("privacyPolicyPage.section1.item14")}</li>
              <li>{translate("privacyPolicyPage.section1.item15")}</li>
            </ul>
            <h4 className="policy__subtitle">
              {translate("privacyPolicyPage.section1.subtitle3")}
            </h4>
            <div>
              <p className="mb-4">
                <Trans
                  i18nKey="privacyPolicyPage.section1.item16"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p>{translate("privacyPolicyPage.section1.item17")}</p>
            </div>
          </li>
          <li className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section2.title")}
            </h3>
            <div className="policy__texts">
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section2.text1"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section2.text2"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
            </div>
            <ul className="policy__list">
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section2.item1"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section2.item2"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section2.item3"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section2.item4"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section2.item5"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section2.item6"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section2.item7"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section2.item8"
                  t={translate}
                  components={[
                    <span className="SFPro-600" />,
                    <Link
                      className="policy__link"
                      to={{
                        hash: "#privacyRights",
                      }}
                    />,
                  ]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section2.item9"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section2.item10"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section2.item11"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section2.item12"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section2.item13"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
            </ul>
          </li>
          <li className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section3.title")}
            </h3>
            <div className="policy__texts">
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section3.text1"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p className="policy__desc SFPro-600">
                {translate("privacyPolicyPage.section3.text2")}
              </p>
              <p>{translate("privacyPolicyPage.section3.text3")}</p>
            </div>
            <ul className="policy__list">
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section3.item1"
                  t={translate}
                  components={[
                    <span className="SFPro-600" />,
                    <Link
                      className="policy__link"
                      to={{
                        hash: "#withdrawing",
                      }}
                    />,
                  ]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section3.item2"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section3.item3"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
                <ul className="policy__list mt-4">
                  <li>{translate("privacyPolicyPage.section3.item4")}</li>
                  <li>{translate("privacyPolicyPage.section3.item5")}</li>
                  <li>{translate("privacyPolicyPage.section3.item6")}</li>
                  <li>{translate("privacyPolicyPage.section3.item7")}</li>
                  <li>{translate("privacyPolicyPage.section3.item8")}</li>
                  <li>{translate("privacyPolicyPage.section3.item9")}</li>
                </ul>
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section3.item10"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section3.item11"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
            </ul>
            <div className="policy__texts">
              <p className="policy__desc SFPro-600">
                {translate("privacyPolicyPage.section3.text4")}
              </p>
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section3.text5"
                  t={translate}
                  components={[
                    <Link
                      className="policy__link"
                      to={{
                        hash: "#withdrawing",
                      }}
                    />,
                  ]}
                />
              </p>
              <p>{translate("privacyPolicyPage.section3.text6")}</p>
            </div>
            <ul className="policy__list">
              <li>{translate("privacyPolicyPage.section3.item12")}</li>
              <li>{translate("privacyPolicyPage.section3.item13")}</li>
              <li>{translate("privacyPolicyPage.section3.item14")}</li>
              <li>{translate("privacyPolicyPage.section3.item15")}</li>
              <li>{translate("privacyPolicyPage.section3.item16")}</li>
              <li>{translate("privacyPolicyPage.section3.item17")}</li>
              <li>{translate("privacyPolicyPage.section3.item18")}</li>
              <li>{translate("privacyPolicyPage.section3.item19")}</li>
              <li>{translate("privacyPolicyPage.section3.item20")}</li>
              <li>{translate("privacyPolicyPage.section3.item21")}</li>
              <li>{translate("privacyPolicyPage.section3.item22")}</li>
            </ul>
          </li>
          <li className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section4.title")}
            </h3>
            <div className="policy__texts">
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section4.text1"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section4.text2"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
            </div>
            <ul className="policy__list">
              <li>{translate("privacyPolicyPage.section4.item1")}</li>
              <li>{translate("privacyPolicyPage.section4.item2")}</li>
              <li>{translate("privacyPolicyPage.section4.item3")}</li>
              <li>{translate("privacyPolicyPage.section4.item4")}</li>
              <li>{translate("privacyPolicyPage.section4.item5")}</li>
              <li>{translate("privacyPolicyPage.section4.item6")}</li>
              <li>{translate("privacyPolicyPage.section4.item7")}</li>
              <li>{translate("privacyPolicyPage.section4.item8")}</li>
              <li>{translate("privacyPolicyPage.section4.item9")}</li>
              <li>{translate("privacyPolicyPage.section4.item10")}</li>
              <li>{translate("privacyPolicyPage.section4.item11")}</li>
              <li>{translate("privacyPolicyPage.section4.item12")}</li>
              <li>{translate("privacyPolicyPage.section4.item13")}</li>
              <li>{translate("privacyPolicyPage.section4.item14")}</li>
              <li>{translate("privacyPolicyPage.section4.item15")}</li>
              <li>{translate("privacyPolicyPage.section4.item16")}</li>
              <li>{translate("privacyPolicyPage.section4.item17")}</li>
              <li>{translate("privacyPolicyPage.section4.item18")}</li>
            </ul>
            <p className="mb-4">
              {translate("privacyPolicyPage.section4.text3")}
            </p>
            <ul className="policy__list">
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section4.item19"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section4.item20"
                  t={translate}
                  components={[
                    <span className="SFPro-600" />,
                    <a
                      className="policy__link"
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noreferrer"
                    />,
                  ]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section4.item21"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section4.item22"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacyPolicyPage.section4.item23"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </li>
            </ul>
          </li>
          <li className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section5.title")}
            </h3>
            <div className="policy__texts">
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section5.text1"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p>{translate("privacyPolicyPage.section5.text2")}</p>
            </div>
          </li>
          <li className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section6.title")}
            </h3>
            <div className="policy__texts">
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section6.text1"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p>{translate("privacyPolicyPage.section6.text2")}</p>
            </div>
          </li>
          <li id="handleLogins" className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section7.title")}
            </h3>
            <div className="policy__texts">
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section7.text1"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p>{translate("privacyPolicyPage.section7.text2")}</p>
              <p>{translate("privacyPolicyPage.section7.text3")}</p>
            </div>
          </li>
          <li className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section8.title")}
            </h3>
            <div className="policy__texts">
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section8.text1"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p>{translate("privacyPolicyPage.section8.text2")}</p>
              <p>{translate("privacyPolicyPage.section8.text3")}</p>
            </div>
          </li>
          <li className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section9.title")}
            </h3>
            <div className="policy__texts">
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section9.text1"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p>{translate("privacyPolicyPage.section9.text2")}</p>
            </div>
          </li>
          <li className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section10.title")}
            </h3>
            <div className="policy__texts">
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section10.text1"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p>{translate("privacyPolicyPage.section10.text2")}</p>
            </div>
          </li>
          <li id="privacyRights" className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section11.title")}
            </h3>
            <div className="policy__texts">
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section11.text1"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section11.text2"
                  t={translate}
                  components={[
                    <Link
                      className="policy__link"
                      to={{
                        hash: "#contactUs",
                      }}
                    />,
                  ]}
                />
              </p>
              <p>{translate("privacyPolicyPage.section11.text3")}</p>
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section11.text4"
                  t={translate}
                  components={[
                    <a
                      className="policy__link"
                      target="_blank"
                      href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
                      rel="noreferrer"
                    />,
                  ]}
                />
              </p>
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section11.text5"
                  t={translate}
                  components={[
                    <a
                      className="policy__link"
                      target="_blank"
                      href="https://www.edoeb.admin.ch/edoeb/en/home.html"
                      rel="noreferrer"
                    />,
                  ]}
                />
              </p>
              <p id="withdrawing">
                <Trans
                  i18nKey="privacyPolicyPage.section11.text6"
                  t={translate}
                  components={[
                    <span className="SFPro-600" />,
                    <Link
                      className="policy__link"
                      to={{
                        hash: "#contactUs",
                      }}
                    />,
                  ]}
                />
              </p>
              <p>{translate("privacyPolicyPage.section11.text7")}</p>
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section11.text8"
                  t={translate}
                  components={[
                    <span className="SFPro-600" />,
                    <Link
                      className="policy__link"
                      to={{
                        hash: "#contactUs",
                      }}
                    />,
                  ]}
                />
              </p>
            </div>
            <h4 className="policy__subtitle SFPro-600">
              {translate("privacyPolicyPage.section11.subtitle")}
            </h4>
            <p className="mb-3">
              {translate("privacyPolicyPage.section11.text9")}
            </p>
            <ul className="policy__list">
              <li>{translate("privacyPolicyPage.section11.item")}</li>
            </ul>
            <div className="policy__texts">
              <p>{translate("privacyPolicyPage.section11.text10")}</p>
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section11.text11"
                  t={translate}
                  components={[
                    <span className="SFPro-600" />,
                    <a
                      className="policy__link"
                      target="_blank"
                      href="http://www.aboutads.info/choices/"
                      rel="noreferrer"
                    />,
                  ]}
                />
              </p>
              <p>{translate("privacyPolicyPage.section11.text12")}</p>
            </div>
          </li>
          <li className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section12.title")}
            </h3>
            <p>{translate("privacyPolicyPage.section12.text")}</p>
          </li>
          <li className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section13.title")}
            </h3>
            <div className="policy__texts">
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section13.text1"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p>{translate("privacyPolicyPage.section13.text2")}</p>
              <p>{translate("privacyPolicyPage.section13.text3")}</p>
            </div>
          </li>
          <li className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section14.title")}
            </h3>
            <div className="policy__texts">
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section14.text1"
                  t={translate}
                  components={[<span className="SFPro-600" />]}
                />
              </p>
              <p>{translate("privacyPolicyPage.section14.text2")}</p>
            </div>
          </li>
          <li id="contactUs" className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section15.title")}
            </h3>
            <p className="mb-4">
              {translate("privacyPolicyPage.section15.text1")}
            </p>
            <address className="policy__address">
              <span className="mb-1">
                {translate("privacyPolicyPage.section15.item1")}
              </span>
              <a
                className="mb-1"
                target="_blank"
                href="https://www.google.com/maps/place/Ma%C5%82achowskiego+8%2Fp1,+61-129+Pozna%C5%84,+%D0%9F%D0%BE%D0%BB%D1%8C%D1%88%D0%B0/data=!4m2!3m1!1s0x47045b916c5f20a7:0x5d2dff2aa3b3b28b?sa=X&ved=2ahUKEwjJ0LOs5s34AhWBQvEDHRJFDa0Q8gF6BAgNEAE"
                rel="noreferrer"
              >
                {translate("privacyPolicyPage.section15.item2")}
              </a>
              <a className="mb-1" href="mailto:info@proxyone.eu">
                info@proxyone.eu
              </a>
              <a className="mb-1" href="tel:+48222085472">
                +48222085472 61-129
              </a>
              <span>{translate("privacyPolicyPage.section15.item4")}</span>
            </address>
          </li>
          <li className="mb-5">
            <h3 className="policy__title SFPro-600">
              {translate("privacyPolicyPage.section16.title")}
            </h3>
            <div className="policy__texts">
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section16.text1"
                  t={translate}
                  components={[
                    <a
                      className="policy__link"
                      href="https://app.termly.io/notify/d960af72-f0bc-4d01-a206-8af5decee010"
                      target="_blank"
                      rel="noreferrer"
                    />,
                  ]}
                />
              </p>
              <p>
                <Trans
                  i18nKey="privacyPolicyPage.section16.text2"
                  t={translate}
                  components={[
                    <a
                      className="policy__link"
                      href="https://termly.io/products/privacy-policy-generator/"
                      target="_blank"
                      rel="noreferrer"
                    />,
                  ]}
                />
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
