import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Networks from "../Networks/Networks";
import "./Contacts.scss";

import { ReactComponent as ContactsImg } from "../../../assets/images/content/contacts.svg";

const Contacts = () => {
  const [showTitleOnMobile, setShowTitleOnMobile] = useState(false);
  const { t: translate } = useTranslation();

  const breadcrumbs = [{ title: translate("contactsPage.title") }];

  useEffect(() => {
    const resizeHandler = () => {
      const { innerWidth } = window;

      if (innerWidth < 768) {
        setShowTitleOnMobile(true);
      } else {
        setShowTitleOnMobile(false);
      }
    };

    resizeHandler();

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const title = (
    <h2 className="title SFPro-600 display-4 mb-5 text-center">
      {translate("contactsPage.title")}
    </h2>
  );

  return (
    <div className="contacts pb-7">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {showTitleOnMobile && title}
      <div className="contacts__wrapper d-flex justify-content-around align-items-center">
        <div className="d-flex flex-column text-center">
          {!showTitleOnMobile && title}
          <h3 className="SFPro-700 display-7 mb-4">LCC “PROXYONE”</h3>
          <address className="display-7 mb-0">
            <h4 className="SFPro-700 display-8">
              {" "}
              {translate("contactsPage.address")}
            </h4>
            <a
              className="mb-4"
              target="_blank"
              href="https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%9A%D0%B0%D0%BB%D1%8C%D0%B2%D0%B0%D1%80%D0%B8%D0%B9%D1%81%D0%BA%D0%B0%D1%8F+33,+%D0%9C%D0%B8%D0%BD%D1%81%D0%BA,+%D0%91%D0%B5%D0%BB%D0%B0%D1%80%D1%83%D1%81%D1%8C/@53.9074448,27.5134533,17z/data=!3m1!4b1!4m5!3m4!1s0x46dbc559a0e0b6f1:0xbb0965877a255b26!8m2!3d53.9074417!4d27.515642"
              rel="noreferrer"
            >
              Minsk, Kalvariyskaya 33
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
            {translate("contactsPage.days")} 10:00-19:00
          </span>
          <Networks />
          <div className="text-center">
            <Button className="text-white px-5 py-2 br-8" variant="primary">
              {translate("contactsPage.button")}
            </Button>
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
