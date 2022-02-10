import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import "./Support.scss";
import SupportImg from "../../assets/images/content/support.svg";
import SupportForm from "./SupportForm/SupportForm";

const breadcrumbs = [{ title: "Support" }];

const Support = () => {
  const [support, setSupport] = useState(false);
  const supportHandler = () => setSupport((prevState) => !prevState);

  return (
    <div className="support">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="wrapper">
        <h2 className="mb-6 display-4 text-center SFPro-600">Support</h2>
        {!support ? (
          <>
            <div className="support__img mb-5 mx-auto">
              <img src={SupportImg} alt="The man put his hand on the safe" />
            </div>
            <h3 className="display-6 SFPro-600 text-center mb-5">
              Do you want to complain?
            </h3>
            <div className="text-center mb-6">
              <Button
                className="text-white px-5 py-2 br-8"
                onClick={supportHandler}
                variant="primary"
              >
                Сomplain
              </Button>
            </div>
            <p className="support__text SFPro-300 display-7">
              Еext of the printing and typesetting industry. Lorem Ipsum has
              been the industry&apos;s standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum
              passages, and more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </>
        ) : (
          <SupportForm onSupportHandler={supportHandler} />
        )}
      </div>
    </div>
  );
};

export default Support;
