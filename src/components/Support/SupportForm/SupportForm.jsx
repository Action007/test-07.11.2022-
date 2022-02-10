import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "./SupportForm.scss";
import { ReactComponent as CloseSvg } from "../../../assets/svg/close.svg";

const SupportForm = ({ onSupportHandler }) => {
  const field = useRef();
  const [empty, setEmpty] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setEmpty(false);
    if (field.current.value.length) return;
    setEmpty(true);
  };

  return (
    <div className="support-form bg-white br-8">
      <div className="support-form__wrap d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <span className="SFPro-600">Complain</span>
        <button onClick={onSupportHandler} type="button">
          <CloseSvg />
        </button>
      </div>
      <form className="support-form__form" onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="exampleInputText" className="w-100">
          <textarea
            className={`support-form__textarea form-control ${
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
          <a className="support-form__link text-primary" href="/#">
            Learn more&nbsp;
          </a>
          about the rules of Chekclist
        </span>
        <div className="support-form__buttons">
          <Button
            className="support-form__button py-2 text-dark br-8"
            onClick={onSupportHandler}
            variant="secondary"
            type="submit"
          >
            Cancel
          </Button>
          <Button
            className="support-form__button py-2 text-white br-8"
            variant="primary"
            type="submit"
          >
            Submit a complaint
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SupportForm;
