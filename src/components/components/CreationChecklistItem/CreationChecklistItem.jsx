/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import useClickOutside from "../../../hooks/useClickOutside";
import CreationChecklistItemEdit from "../CreationChecklistItemEdit/CreationChecklistItemEdit";
import GeneralMap from "../GeneralMap/GeneralMap";
import PopupMap from "../PopupMap/PopupMap";
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
  const [state, setState] = useState("text");
  const [showMap, setShowMap] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [fadeIn, setFadeIn] = useState("");
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { ref, show, setShowHandler } = useClickOutside(true);
  const inputRef = useRef();

  useEffect(() => {
    const setClassFunc = setTimeout(() => setFadeIn(" show"), 0);
    return () => clearTimeout(setClassFunc);
  }, []);

  const onChangeValueHandler = (e, type) => {
    // eslint-disable-next-line no-shadow
    const { value } = e.target;
    const inputValue = inputRef.current.value;

    dispatch(
      createChecklistActions.changeChecklistInputValue({
        type,
        value,
        id,
        inputValue,
      })
    );
  };

  const checklistTypeHandler = (str) => {
    if (state === str) return;
    dispatch(createChecklistActions.defineChecklist({ str, id }));
    setState(str);
  };

  const addItemOnEnter = (e) => {
    if (e.key !== "Enter") return;
    dispatch(createChecklistActions.addChecklist());
  };

  const selectImg = (
    <label className="creation-item__img" htmlFor={id + 1}>
      <ImgIcon />
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(event) => {
          dispatch(
            createChecklistActions.addImage({
              id,
              image: URL.createObjectURL(event.target.files[0]),
            })
          );
        }}
        id={id + 1}
      />
      <span className="SFPro-500">Add image</span>
    </label>
  );

  const ImgSelected = list_type === "image" && value?.image && (
    <>
      <div className="creation-item__img">
        <img src={value.image} alt="" />
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
      <div ref={ref}>
        <div
          className={`creation-item__wrap${inValid ? " invalid" : ""}`}
          onMouseDown={setShowHandler}
        >
          <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provide.dragHandleProps}
            className={`creation-item__number SFPro-600${
              inValid ? " invalid" : ""
            }`}
          >
            <ChecklistDots />
            {number}.
          </div>
          <div className="creation-item__inner">
            {inValid ? (
              <span className="creation-item__invalid">
                {translate("creationOfChecklist.max")}
              </span>
            ) : (
              ""
            )}
            <label
              className={`creation-item__name${inValid ? " invalid" : ""}`}
              htmlFor={id}
            >
              <input
                onChange={(e) => onChangeValueHandler(e, "text")}
                onKeyPress={(e) => addItemOnEnter(e)}
                value={description}
                type="text"
                id={id}
                ref={inputRef}
              />
            </label>
            {list_type === "link" && (
              <label
                className={`creation-item__link${inValid ? " invalid" : ""}`}
                htmlFor={id + 1}
              >
                <input
                  onChange={(e) => onChangeValueHandler(e, "link")}
                  onKeyPress={(e) => addItemOnEnter(e)}
                  value={value.link}
                  placeholder="Insert link"
                  type="text"
                  id={id + 1}
                />
              </label>
            )}
            {list_type === "image" && !value.image && selectImg}
            {ImgSelected}
            {list_type === "coordinates" && (
              <>
                <div className="creation-item__wrapper">
                  <GeneralMap setShowMap={setShowMap} creation id={id} />
                </div>
                <CSSTransition in={showMap} timeout={300} unmountOnExit>
                  <PopupMap show={showMap} onHide={() => setShowMap(false)}>
                    <GeneralMap popup creation id={id} />
                  </PopupMap>
                </CSSTransition>
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
