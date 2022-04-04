import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import "./Complain.scss";

import { ReactComponent as CloseSvg } from "../../../assets/images/icon/close.svg";
import { ReactComponent as DoneSvg } from "../../../assets/images/content/supportDone.svg";

const Complain = ({ closeHandler }) => {
  const [done] = useState(false);
  const field = useRef();
  const [empty, setEmpty] = useState(false);
  const { t: translate } = useTranslation();

  const submitHandler = (e) => {
    e.preventDefault();
    setEmpty(false);
    if (field.current.value.length) return;
    setEmpty(true);
  };

  return (
    <>
      {!done && (
        <div className="complain bg-white br-8">
          <div className="complain__wrap d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
            <span className="SFPro-600">Complain</span>
            <button onClick={closeHandler} type="button">
              <CloseSvg />
            </button>
          </div>
          <form className="complain__form" onSubmit={(e) => submitHandler(e)}>
            <label htmlFor="exampleInputText" className="w-100">
              <textarea
                className={`complain__textarea form-control ${
                  empty && "border-danger"
                }`}
                type="text"
                id="exampleInputText"
                aria-describedby="textHelp"
                placeholder="Please insert the link of the page you want to complain about"
                ref={field}
              />
            </label>
            <small
              className={`form-text mb-4 d-block ${empty && "text-danger"}`}
              id="textHelp"
            >
              Required field*
            </small>
            <p className="SFPro-600 display-8 mb-4">
              What exactly do you think is unacceptable in this material?
            </p>
            <div className="form-check mb-3">
              <label
                className="form-check-label display-8"
                htmlFor="flexRadioDefault1"
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                Spam
              </label>
            </div>
            <div className="form-check mb-3">
              <label
                className="form-check-label display-8"
                htmlFor="flexRadioDefault2"
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                />
                Prohibited item
              </label>
            </div>
            <div className="form-check mb-3">
              <label
                className="form-check-label display-8"
                htmlFor="flexRadioDefault3"
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault3"
                />
                Violence and hostility
              </label>
            </div>
            <div className="form-check mb-4">
              <label
                className="form-check-label display-8"
                htmlFor="flexRadioDefault4"
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault4"
                />
                Adult Materials
              </label>
            </div>
            <span className="mb-4 d-block text-light">
              <a className="complain__link text-primary" href="/#">
                Learn more&nbsp;
              </a>
              about the rules of Chekclist
            </span>
            <div className="complain__buttons">
              <Button
                className="complain__button py-2 text-dark br-8"
                onClick={closeHandler}
                variant="secondary"
                type="button"
              >
                Cancel
              </Button>
              <Button
                className="complain__button py-2 text-white br-8"
                variant="primary"
                type="submit"
              >
                Submit a complaint
              </Button>
            </div>
          </form>
        </div>
      )}
      {done && (
        <div className="complain-done">
          <button
            className="complain-done__btn"
            onClick={closeHandler}
            type="button"
          >
            <CloseSvg />
          </button>
          <div className="complain-done__wrapper">
            <div className="complain-done__wrap">
              <h3 className="complain-done__title SFPro-600">
                {translate("supportDone.title")}
              </h3>
              <span className="complain-done__subtitle">
                {translate("supportDone.subtitle")}
              </span>
            </div>
            <div className="complain-done__img">
              <DoneSvg />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Complain;
