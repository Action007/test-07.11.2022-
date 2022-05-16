import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Complain from "../Complain/Complain";
import "./Support.scss";

import { ReactComponent as SupportImg } from "../../../assets/images/content/support.svg";

const Support = () => {
  const [support, setSupport] = useState(false);
  const { t: translate } = useTranslation();
  const supportHandler = () => setSupport((prevState) => !prevState);

  const breadcrumbs = [{ title: translate("supportPage.title") }];

  return (
    <div className="container support pb-8">
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
                Complain
              </button>
            </div>
            <p className="support__text SFPro-300 display-7">
              Exit of the printing and typesetting industry. Lorem Ipsum has
              been the industry&apos;s standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of letraset sheets containing Lorem Ipsum
              passages, and more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </>
        ) : (
          <Complain closeHandler={supportHandler} page="support" />
        )}
      </div>
    </div>
  );
};

export default Support;
