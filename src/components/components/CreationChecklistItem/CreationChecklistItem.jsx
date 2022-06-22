import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import CreationChecklistItemEdit from "../CreationChecklistItemEdit/CreationChecklistItemEdit";
import MapGeneral from "../MapGeneral/MapGeneral";
import MapModal from "../MapModal/MapModal";
import "./CreationChecklistItem.scss";
import { ReactComponent as ChecklistDots } from "../../../assets/images/icon/checklistDots.svg";
import { ReactComponent as ImgIcon } from "../../../assets/images/icon/img.svg";
import { ReactComponent as CancelIcon } from "../../../assets/images/icon/cancel.svg";
import { ReactComponent as ExtendSvg } from "../../../assets/images/icon/expand-map.svg";

const CreationChecklistItem = ({
  provide,
  description,
  list_type,
  number,
  value,
  inValid,
  id,
}) => {
  const validateAfterSubmit = useSelector(
    (state) => state.createChecklistReducer.validateAfterSubmit
  );
  const [checklistItemType, setChecklistItemType] = useState("text");
  const [showMap, setShowMap] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [fadeIn, setFadeIn] = useState("");
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const [show, setShow] = useState(false);
  const textInput = useRef(null);
  const divCurent = useRef(null);

  useEffect(() => {
    const setClassFunc = setTimeout(() => setFadeIn(" show"), 0);
    const setFocusFunc = setTimeout(() => {
      textInput.current.focus();
      divCurent.current.focus();
    }, 300);

    return () => {
      clearTimeout(setFocusFunc);
      clearTimeout(setClassFunc);
    };
  }, []);

  const contains = (parent, child) => {
    if (!child || !child.parentElement) return false;
    if (child.parentElement === parent) return true;
    return contains(parent, child.parentElement);
  };

  const onFocusHandler = () => {
    setShow(true);
  };

  const onBlurHandler = (e) => {
    const target = e.relatedTarget;
    const parent = e.currentTarget;
    if (!contains(parent, target)) {
      setShow(false);
    }
  };

  const onChangeValueHandler = (e, type) => {
    const inputValue = e.target.value;

    dispatch(
      createChecklistActions.changeChecklistInputValue({
        type,
        inputValue,
        id,
      })
    );
  };

  const checklistTypeHandler = (defineType) => {
    if (checklistItemType === defineType) return;
    dispatch(createChecklistActions.defineChecklist({ defineType, id }));
    setChecklistItemType(defineType);
  };

  const addItemOnEnter = (e) => {
    if (e.key !== "Enter") return;
    dispatch(createChecklistActions.addChecklist());
  };

  const onUpdateImageHandler = (event) => {
    dispatch(
      createChecklistActions.addImage({
        id,
        image: URL.createObjectURL(event.target.files[0]),
      })
    );
  };

  const selectImg = (
    <label className="creation-item__img" htmlFor={id + 2}>
      <div className="creation-item__svg">
        <ImgIcon />
      </div>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(event) => onUpdateImageHandler(event)}
        id={id + 2}
      />
      <span className="SFPro-500">Add image</span>
    </label>
  );

  const ImgSelected = list_type === "image" && value?.image && (
    <>
      <div className="creation-item__img">
        <img src={URL.createObjectURL(value.image)} alt="" />
        <button
          onClick={() => dispatch(createChecklistActions.removeImage(id))}
          className="creation-item__remove"
          type="button"
        >
          <CancelIcon />
        </button>
        <button
          onClick={() => setShowImage(true)}
          className="creation-item__extend"
          type="button"
        >
          <ExtendSvg />
        </button>
      </div>
      <Modal
        className="creation-item__popup"
        show={showImage}
        onHide={setShowImage}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" />
        </Modal.Header>
        <Modal.Body>
          <img src={value.image} alt="" />
        </Modal.Body>
      </Modal>
    </>
  );

  return (
    <li
      className={`creation-item${fadeIn}`}
      ref={provide.innerRef}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...provide.draggableProps}
    >
      <div ref={divCurent} onFocus={onFocusHandler} onBlur={onBlurHandler}>
        <div
          className={`creation-item__wrap${
            inValid && validateAfterSubmit ? " invalid" : ""
          }`}
        >
          <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provide.dragHandleProps}
            className={`creation-item__number SFPro-600${
              inValid && validateAfterSubmit ? " invalid" : ""
            }`}
            tabIndex="-1"
          >
            <ChecklistDots />
            {number}.
          </div>
          <div className="creation-item__inner">
            {!!inValid && validateAfterSubmit && (
              <span className="creation-item__invalid text">
                {translate("creationOfChecklist.max")}
              </span>
            )}
            <label className="creation-item__text" htmlFor={id}>
              <input
                onChange={(e) => onChangeValueHandler(e, "text")}
                onKeyPress={(e) => addItemOnEnter(e)}
                className="creation-item__input"
                value={description}
                type="text"
                id={id}
                ref={textInput}
              />
            </label>
            {list_type === "link" && (
              <>
                {!value.link.isValid && validateAfterSubmit && (
                  <span className="creation-item__invalid link">
                    {translate("creationOfChecklist.isLinkValid")}
                  </span>
                )}
                <label
                  className={`creation-item__link${
                    !value.link.isValid && validateAfterSubmit ? " invalid" : ""
                  }`}
                  htmlFor={id + 1}
                >
                  <input
                    onChange={(e) => onChangeValueHandler(e, "link")}
                    onKeyPress={(e) => addItemOnEnter(e)}
                    value={value.link.value}
                    placeholder={translate("creationOfChecklist.link")}
                    type="text"
                    id={id + 1}
                  />
                </label>
              </>
            )}
            {list_type === "image" && !value.image && selectImg}
            {ImgSelected}
            {list_type === "coordinates" && (
              <>
                <div className="map-container">
                  {!showMap ? (
                    <MapGeneral
                      setShowMap={setShowMap}
                      coordinates={value.coordinates || undefined}
                      page="creation-of-checklist"
                      id={id}
                    />
                  ) : (
                    <div className="map-fake" />
                  )}
                </div>
                <MapModal
                  show={showMap}
                  onHide={() => setShowMap(false)}
                  coordinates={value.coordinates || undefined}
                  page="creation-of-checklist"
                  id={id}
                />
              </>
            )}
          </div>
        </div>
        {show && (
          <CreationChecklistItemEdit
            typeChecklistHandler={checklistTypeHandler}
            id={id}
            setFadeIn={setFadeIn}
          />
        )}
      </div>
    </li>
  );
};

export default CreationChecklistItem;
