import React from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./OurMission.scss";
import RocketImg from "../../assets/images/content/rocket.svg";

const breadcrumbs = [{ title: "Our mission" }];

const OurMission = () => (
  <div className="about">
    <Breadcrumbs breadcrumbs={breadcrumbs} />
    <div className="wrapper">
      <h2 className="mb-5 display-4 text-center SFPro-600">Our mission</h2>
      <div className="about__img mb-5 mx-auto">
        <img src={RocketImg} alt="Man looks at examples" />
      </div>
      <h3 className="display-6 SFPro-600">1. Lorem Ipsum is simply dummy</h3>
      <span className="mb-3 d-block SFPro-300 display-7">
        Lorem Ipsum is simply dummy
      </span>
      <p className="about__text SFPro-300 display-7">
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
      <p className="about__text SFPro-300 display-7">
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
      <p className="about__text SFPro-300 display-7">
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

export default OurMission;
