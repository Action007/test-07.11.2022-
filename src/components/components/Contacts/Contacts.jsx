import React from "react";
import { useTranslation } from "react-i18next";
import useMediaQuery from "../../../hooks/useMediaQuery";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Networks from "../Networks/Networks";
import "./Contacts.scss";

import { ReactComponent as ContactsImg } from "../../../assets/images/content/contacts.svg";

const Contacts = () => {
  const showTitleOnMobile = useMediaQuery("(max-width:767px)");
  const { t: translate } = useTranslation();

  const breadcrumbs = [{ title: translate("contactsPage.title") }];

  const title = (
    <h2 className="title SFPro-600 display-4 text-center mb-3 mb-md-5">
      {translate("contactsPage.title")}
    </h2>
  );

  return (
    <div className="container contacts pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {showTitleOnMobile && title}
      <div className="contacts__wrapper d-flex justify-content-around align-items-center">
        <div className="d-flex flex-column text-center">
          {!showTitleOnMobile && title}
          <h3 className="SFPro-700 display-7 mb-4">
            {translate("contactsPage.companyName")}
          </h3>
          <address className="display-7 mb-0">
            <h4 className="SFPro-700 display-8">
              {translate("contactsPage.address")}
            </h4>
            <a
              className="mb-4"
              target="_blank"
              href="https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%9A%D0%B0%D0%BB%D1%8C%D0%B2%D0%B0%D1%80%D0%B8%D0%B9%D1%81%D0%BA%D0%B0%D1%8F+33,+%D0%9C%D0%B8%D0%BD%D1%81%D0%BA,+%D0%91%D0%B5%D0%BB%D0%B0%D1%80%D1%83%D1%81%D1%8C/@53.9074448,27.5134533,17z/data=!3m1!4b1!4m5!3m4!1s0x46dbc559a0e0b6f1:0xbb0965877a255b26!8m2!3d53.9074417!4d27.515642"
              rel="noreferrer"
            >
              {translate("contactsPage.addressText")}
            </a>
            <h4 className="SFPro-700 display-8">
              {translate("contactsPage.numbers")}
            </h4>
            <a className="mb-4" href="tel:(+375)0000000000">
              + 375 00 000 000 00
            </a>
            <h4 className="SFPro-700 display-8">
              {translate("contactsPage.email")}
            </h4>
            <a className="mb-4" href="mailto:go@info@example.com">
              info@example.com
            </a>
          </address>
          <h4 className="SFPro-700 display-8">
            {translate("contactsPage.hours")}
          </h4>
          <span className="display-7 mb-5">
            {translate("contactsPage.days")}
          </span>
          <Networks />
          <div className="text-center">
            <button className="checklist-button" type="button">
              {translate("contactsPage.button")}
            </button>
          </div>
        </div>
        <div className="contacts__img">
          <ContactsImg />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
