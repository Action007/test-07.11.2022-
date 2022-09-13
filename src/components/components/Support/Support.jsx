import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Complain from "../Complain/Complain";
import Notification from "../../UI/Notification/Notification";
import "./Support.scss";

import { ReactComponent as SupportImg } from "../../../assets/images/content/support.svg";

const Support = () => {
  const [showPageNotification, setShowPageNotification] = useState(false);
  const [support, setSupport] = useState(false);
  const { t: translate } = useTranslation();
  const supportHandler = () => setSupport((prevState) => !prevState);

  const breadcrumbs = [{ title: translate("supportPage.title") }];

  return (
    <>
      {showPageNotification && (
        <Notification
          translate={translate("notification.alreadyComplained")}
          isError
          isComplain
        />
      )}
      <section
        className={`container support pb-8${
          showPageNotification ? " show-notification" : ""
        }`}
      >
        <div className="container-wrapper">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <h2 className="mb-6 display-4 text-center SFPro-600">
            {translate("supportPage.title")}
          </h2>
          {!support ? (
            <>
              <div className="support__img mb-5 mx-auto">
                <SupportImg />
              </div>
              <h3 className="display-6 SFPro-600 text-center mb-4 mb-sm-5">
                {translate("supportPage.subtitle")}
              </h3>
              <div className="text-center mb-6">
                <button
                  onClick={supportHandler}
                  className="checklist-button"
                  type="button"
                >
                  {translate("supportPage.button")}
                </button>
              </div>
              <p className="support__text SFPro-300 display-7 mb-5">
                <Trans
                  i18nKey="supportPage.text1"
                  t={translate}
                  components={[
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/anchor-has-content
                    <a
                      href={`mailto:support@${window.location.host}?subject=Support&body=Hello.%20I%20would%20like%20to%20make%20a%20request%20of%20you.%20Please...`}
                    />,
                  ]}
                />
              </p>
              <p className="support__text SFPro-300 display-7">
                <Trans
                  i18nKey="supportPage.text2"
                  t={translate}
                  components={[
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/anchor-has-content
                    <a
                      href={`mailto:support@${window.location.host}?subject=Support&body=Hello.%20I%20would%20like%20to%20make%20a%20request%20of%20you.%20Please...`}
                    />,
                  ]}
                />
              </p>
            </>
          ) : (
            <Complain
              closeHandler={supportHandler}
              page="support"
              showPageNotification={showPageNotification}
              setShowPageNotification={setShowPageNotification}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Support;
