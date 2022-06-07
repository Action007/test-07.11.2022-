/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import useClickOutside from "../../../hooks/useClickOutside";
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
  const [checklistItemType, setChecklistItemType] = useState("text");
  const [showMap, setShowMap] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [fadeIn, setFadeIn] = useState("");
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { ref, show, setShowHandler } = useClickOutside(true);

  useEffect(() => {
    setFadeIn(" show");
  }, []);

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

  const selectImg = (
    <label className="creation-item__img" htmlFor={id + 2}>
      <div className="creation-item__svg">
        <ImgIcon />
      </div>
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
        id={id + 2}
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
            {!!inValid && (
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
              />
            </label>
            {list_type === "link" && (
              <>
                {!value.link.isValid && (
                  <span className="creation-item__invalid link">
                    {translate("creationOfChecklist.isLinkValid")}
                  </span>
                )}
                <label
                  className={`creation-item__link${
                    !value.link.isValid ? " invalid" : ""
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
