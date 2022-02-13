import React from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./TermsOfUse.scss";
import Example from "../../../assets/images/content/terms-of-use.svg";

const breadcrumbs = [{ title: "Term of use" }];

const TermOfUse = () => (
  <div className="term pb-7">
    <Breadcrumbs breadcrumbs={breadcrumbs} />
    <div className="wrapper">
      <h2 className="mb-5 display-4 text-center SFPro-600">Term of use</h2>
      <div className="term__img mb-5 mx-auto">
        <img src={Example} alt="Man looks at examples" />
      </div>
      <h3 className="display-6 SFPro-600">1. Lorem Ipsum is simply dummy</h3>
      <span className="mb-3 d-block SFPro-300 display-7">
        Lorem Ipsum is simply dummy
      </span>
      <p className="term__text SFPro-300 display-7 mb-7">
        text of the printing and typesetting industry. Lorem Ipsum has been the
        industry&apos;s standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the
        leap into electronic typesetting, remaining essentially unchanged. It
        was popularised in the 1960s with the release of Letraset sheets
        containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
        Ipsum.
      </p>
      <h3 className="display-6 SFPro-600">2. Lorem Ipsum is simply dummy</h3>
      <span className="mb-3 d-block SFPro-300 display-7">
        Lorem Ipsum is simply dummy
      </span>
      <p className="term__text SFPro-300 display-7 mb-7">
        text of the printing and typesetting industry. Lorem Ipsum has been the
        industry&apos;s standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the
        leap into electronic typesetting, remaining essentially unchanged. It
        was popularised in the 1960s with the release of Letraset sheets
        containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
        Ipsum.
      </p>
      <h3 className="display-6 SFPro-600">3. Lorem Ipsum is simply dummy</h3>
      <span className="mb-3 d-block SFPro-300 display-7">
        Lorem Ipsum is simply dummy
      </span>
      <p className="term__text SFPro-300 display-7">
        text of the printing and typesetting industry. Lorem Ipsum has been the
        industry&apos;s standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the
        leap into electronic typesetting, remaining essentially unchanged. It
        was popularised in the 1960s with the release of Letraset sheets
        containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
        Ipsum.
      </p>
    </div>
  </div>
);

export default TermOfUse;
