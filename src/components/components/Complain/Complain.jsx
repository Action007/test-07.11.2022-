import React, { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { checklistAPI } from "../../../services/checklistService";
import LoadingSpinnerPopup from "../../UI/LoadingSpinnerPopup/LoadingSpinnerPopup";
import ComplainDone from "../ComplainDone/ComplainDone";
import "./Complain.scss";

import { ReactComponent as CloseSvg } from "../../../assets/images/icon/close.svg";

const Complain = ({ closeHandler, id, name, page }) => {
  const [changeChecklist, setChangeChecklist] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [category, setCategory] = useState("");
  const [checklistId, setChecklistId] = useState(id);
  const skip = page !== "support" || !checklistId;
  const { data: checklist, isFetching } =
    checklistAPI.useFetchChecklistForSupportQuery(checklistId, {
      skip,
    });
  const [supportChecklist, { isSuccess, isError, isLoading: isSendLoading }] =
    checklistAPI.useSupportChecklistMutation();
  const [done, setDone] = useState(false);
  const field = useRef();
  const [empty, setEmpty] = useState(false);
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const showComplain = (!done && !isSendLoading) || page === "support";

  useEffect(() => {
    if (field.current) field.current.focus();
  }, [changeChecklist]);

  useEffect(() => {
    if (isSuccess) {
      setDone(true);
      setShowDone(true);
    }
    if (isError) navigate("/error");
  }, [isSuccess, isError]);

  const submitHandler = (e) => {
    e.preventDefault();
    setEmpty(false);
    if (!checklistId || !category) return;

    const body = {
      checklist_id: checklistId,
      issue_type: category,
    };

    supportChecklist(body);
  };

  const onChangeHandler = () => {
    const checklistID = field.current.value.match(/\/list\/(\d+)/);
    if (checklistID) setChecklistId(checklistID[1]);
    setChangeChecklist(false);
  };

  return (
    <>
      <LoadingSpinnerPopup showSpinner={isSendLoading} />
      {showComplain && (
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
                {page === "support" ? (
                  checklist &&
                  !isFetching && (
                    <button
                      onClick={() => setChangeChecklist(true)}
                      className="complain__title SFPro-600"
                      type="button"
                    >
                      {checklist.checklist.name}
                    </button>
                  )
                ) : (
                  <div className="complain__title SFPro-600">{name}</div>
                )}
                {isFetching && (
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
                  {translate("supportPage.field")}
                </small>
              </>
            )}
            <p className="SFPro-600 display-8 mb-4">
              {translate("supportPage.desc")}
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
                {translate("supportPage.spam")}
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
                {translate("supportPage.prohibited")}
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
                {translate("supportPage.violence")}
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
                {translate("supportPage.adult")}
              </label>
            </div>
            <span className="mb-4 d-block text-light">
              <Trans
                i18nKey="supportPage.more"
                t={translate}
                components={[
                  <Link
                    className="complain__link text-primary"
                    to="/terms-of-use"
                  />,
                ]}
              />
            </span>
            <div className="complain__buttons">
              <button
                onClick={closeHandler}
                className="complain__button SFPro-600"
                type="button"
              >
                {translate("supportPage.cancel")}
              </button>
              <button className="complain__button SFPro-600" type="submit">
                {translate("supportPage.submit")}
              </button>
            </div>
          </form>
        </div>
      )}
      {done && page !== "support" && (
        <ComplainDone closeHandler={closeHandler} translate={translate} />
      )}
      {page === "support" && (
        <Modal
          className="popup-complain"
          show={showDone}
          onHide={setShowDone}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" />
          </Modal.Header>
          <Modal.Body>
            <ComplainDone closeHandler={closeHandler} translate={translate} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Complain;
