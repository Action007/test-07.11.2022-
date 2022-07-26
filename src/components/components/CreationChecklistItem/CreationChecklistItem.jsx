/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import CreationChecklistItemEdit from "../CreationChecklistItemEdit/CreationChecklistItemEdit";
import useClickOutside from "../../../hooks/useClickOutside";
import MapGeneral from "../MapGeneral/MapGeneral";
import validateLink from "../../../utils/validateLink";
import MapModal from "../MapModal/MapModal";
import "./CreationChecklistItem.scss";
import { ReactComponent as ChecklistDots } from "../../../assets/images/icon/checklistDots.svg";
import { ReactComponent as CancelIcon } from "../../../assets/images/icon/cancel.svg";
import { ReactComponent as ExtendSvg } from "../../../assets/images/icon/expand-map.svg";

const CreationChecklistItem = ({
  provide,
  description,
  list_type,
  number,
  value,
  inValid,
  itemsNotContainLinks,
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
  const { ref, show, setShow } = useClickOutside(true);
  const [isImgSmall, setIsImgSmall] = useState(true);
  const [isImgValid, setIsImgValid] = useState(true);
  const textInput = useRef(null);
  const isLinkValid = validateLink(value.link);

  useEffect(() => {
    const setTime = setTimeout(() => setFadeIn("show"), 0);
    return () => clearTimeout(setTime);
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

  const onTabClick = (e) => {
    if (e.key === "Tab") setShow(false);
  };

  const onUpdateImageHandler = (event) => {
    const image = event.target.files[0];
    const file = image;
    const pattern = /image-*/;

    if (!file.type.match(pattern)) {
      setIsImgValid(false);
      setIsImgSmall(true);
      return;
    }
    setIsImgValid(true);

    if (image.size > 2e6) {
      setIsImgSmall(false);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        const images = reader.result;
        dispatch(
          createChecklistActions.addImage({
            id,
            image: images,
          })
        );
      };
      setIsImgSmall(true);
    }
  };

  const selectImg = (
    <>
      {!isImgSmall && (
        <span className="creation-item__invalid image">
          {translate("creationOfChecklist.2mb")}
        </span>
      )}
      {!isImgValid && (
        <span className="creation-item__invalid image">
          {translate("creationOfChecklist.notImage")}
        </span>
      )}
      <label
        className={`creation-item__img${
          !isImgSmall || !isImgValid ? " invalid" : ""
        }`}
        htmlFor={id + 2}
      >
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={(event) => onUpdateImageHandler(event)}
          id={id + 2}
        />
        <span className="creation-item__add SFPro-500">
          {translate("creationOfChecklist.addImage")}
        </span>
      </label>
    </>
  );

  const ImgSelected = list_type === "image" && value?.image && (
    <>
      <div className="creation-item__img">
        <img src={value.image} alt={description} />
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
          <img src={value.image} alt={description} />
          <button
            onClick={() => setShowImage(false)}
            className="creation-item__remove"
            type="button"
          >
            <CancelIcon />
          </button>
        </Modal.Body>
      </Modal>
    </>
  );

  return (
    <li
      className={`creation-item ${fadeIn}`}
      ref={provide.innerRef}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...provide.draggableProps}
    >
      <div ref={ref}>
        <div
          className={`creation-item__wrap${
            itemsNotContainLinks || (inValid && validateAfterSubmit)
              ? " invalid"
              : ""
          }`}
          onKeyDown={onTabClick}
          onFocus={() => setShow(true)}
        >
          <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provide.dragHandleProps}
            className={`creation-item__number SFPro-600${
              itemsNotContainLinks || (inValid && validateAfterSubmit)
                ? " invalid"
                : ""
            }`}
            tabIndex="-1"
          >
            <ChecklistDots />
            {number}.
          </div>
          <div className="creation-item__inner">
            {!!inValid && validateAfterSubmit && (
              <span className="creation-item__invalid text">
                {translate("creationOfChecklist.maxItem")}
              </span>
            )}
            {itemsNotContainLinks && (
              <span className="creation-item__invalid text">
                {translate("creationOfChecklist.itemsNotContainLinks")}
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
                {!isLinkValid && validateAfterSubmit && (
                  <span className="creation-item__invalid link">
                    {translate("creationOfChecklist.isLinkValid")}
                  </span>
                )}
                <label
                  className={`creation-item__link${
                    !isLinkValid && validateAfterSubmit ? " invalid" : ""
                  }`}
                  htmlFor={id + 1}
                >
                  <input
                    onChange={(e) => onChangeValueHandler(e, "link")}
                    onKeyPress={(e) => addItemOnEnter(e)}
                    value={value.link}
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
