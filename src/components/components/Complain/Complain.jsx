import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { checklistAPI } from "../../../services/checklistService";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import "./Complain.scss";

import { ReactComponent as CloseSvg } from "../../../assets/images/icon/close.svg";
import { ReactComponent as DoneSvg } from "../../../assets/images/content/supportDone.svg";

const Complain = ({ closeHandler, id }) => {
  const [changeChecklist, setChangeChecklist] = useState(false);
  const [category, setCategory] = useState("");
  const [checklistId, setChecklistId] = useState(id);
  const { data: checklist, isLoading: isFetchLoading } =
    checklistAPI.useFetchChecklistQuery(
      checklistId ? `/api/v1/checklists_auth/${checklistId}` : ""
    );
  // eslint-disable-next-line no-empty-pattern
  const [supportChecklist, { isSuccess, isError, isLoading: isSendLoading }] =
    checklistAPI.useSupportChecklistMutation();
  const [done, setDone] = useState(false);
  const field = useRef();
  const [empty, setEmpty] = useState(false);
  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (field.current) field.current.focus();
  }, [changeChecklist]);

  useEffect(() => {
    if (isSuccess) setDone(true);
    if (isError) navigate("/error");
  }, [isSuccess, isError]);

  const submitHandler = (e) => {
    e.preventDefault();
    setEmpty(false);
    if (!checklistId) return;

    const body = {
      checklist_id: checklistId,
      issue_type: category,
    };

    supportChecklist(body);
  };

  const onChangeHandler = () => {
    // eslint-disable-next-line no-shadow
    const id = field.current.value.match(/\/list\/(\d+)/);
    if (id) {
      setChecklistId(id[1]);
      setChangeChecklist(false);
    }
  };

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isSendLoading} />
      {!done && !isSendLoading && (
        <div className="complain bg-white br-8">
          <div className="complain__wrap d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
            <span className="SFPro-600">Complain</span>
            <button onClick={closeHandler} type="button">
              <CloseSvg />
            </button>
          </div>
          <form className="complain__form" onSubmit={(e) => submitHandler(e)}>
            {checklistId && !changeChecklist ? (
              <>
                {checklist &&
                  (id ? (
                    <div className="complain__title SFPro-600">
                      {checklist.name}
                    </div>
                  ) : (
                    <button
                      onClick={() => setChangeChecklist(true)}
                      className="complain__title SFPro-600"
                      type="button"
                    >
                      {checklist.name}
                    </button>
                  ))}
                {isFetchLoading && (
                  <div className="complain__load">
                    <div className="complain__load-item" />
                    <div className="complain__load-item" />
                  </div>
                )}
              </>
            ) : (
              <>
                <label htmlFor="exampleInputText" className="w-100">
                  <textarea
                    onChange={onChangeHandler}
                    className={`complain__textarea form-control ${
                      empty && "border-danger"
                    }`}
                    type="text"
                    id="exampleInputText"
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
              </>
            )}
            <p className="SFPro-600 display-8 mb-4">
              What exactly do you think is unacceptable in this material?
            </p>
            <div className="form-check mb-3">
              <label
                className="form-check-label display-8"
                htmlFor="flexRadioDefault1"
              >
                <input
                  onChange={() => setCategory("spam")}
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
                  onChange={() => setCategory("prohibited")}
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
                  onChange={() => setCategory("violence")}
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
                  onChange={() => setCategory("adult")}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault4"
                />
                Adult Materials
              </label>
            </div>
            <span className="mb-4 d-block text-light">
              <Link className="complain__link text-primary" to="/terms-of-use">
                Learn more&nbsp;
              </Link>
              about the rules of Chekclist
            </span>
            <div className="complain__buttons">
              <button
                onClick={closeHandler}
                className="complain__button SFPro-600"
                type="button"
              >
                Cancel
              </button>
              <button className="complain__button SFPro-600" type="submit">
                Submit a complaint
              </button>
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
