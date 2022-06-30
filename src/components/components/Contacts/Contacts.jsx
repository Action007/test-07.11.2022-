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
    <section className="container contacts pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {showTitleOnMobile && title}
      <div className="contacts__wrapper d-flex justify-content-between align-items-center">
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
              className="contacts__link mb-4"
              target="_blank"
              href="https://www.google.com/maps/place/Ma%C5%82achowskiego+8%2Fp1,+61-129+Pozna%C5%84,+%D0%9F%D0%BE%D0%BB%D1%8C%D1%88%D0%B0/data=!4m2!3m1!1s0x47045b916c5f20a7:0x5d2dff2aa3b3b28b?sa=X&ved=2ahUKEwjJ0LOs5s34AhWBQvEDHRJFDa0Q8gF6BAgNEAE"
              rel="noreferrer"
            >
              {translate("contactsPage.addressText")}
            </a>
            <h4 className="SFPro-700 display-8">
              {translate("contactsPage.numbers")}
            </h4>
            <a className="contacts__tel" href="tel:+48222085472">
              +48222085472
            </a>
            <a className="contacts__tel mb-4" href="tel:+12098130160">
              +12098130160
            </a>
            <h4 className="SFPro-700 display-8">
              {translate("contactsPage.email")}
            </h4>
            <a className="mb-4" href="mailto:info@proxyone.eu">
              info@proxyone.eu
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
            <a
              href="mailto:support@checklists.com"
              className="checklist-button"
            >
              {translate("contactsPage.button")}
            </a>
          </div>
        </div>
        <div className="contacts__img">
          <ContactsImg />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
