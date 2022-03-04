import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import CreationChecklistItemEdit from "../CreationChecklistItemEdit/CreationChecklistItemEdit";
import GeneralMap from "../GeneralMap/GeneralMap";
import PopupMap from "../PopupMap/PopupMap";
import "./CreationChecklistItem.scss";

import { ReactComponent as ChecklistDots } from "../../../assets/images/icon/checklistDots.svg";
import { ReactComponent as ImgIcon } from "../../../assets/images/icon/img.svg";
import { ReactComponent as TrashIcon } from "../../../assets/images/icon/trash.svg";

const CreationChecklistItem = ({
  provide,
  description,
  list_type,
  number,
  value,
  inValid,
  id,
}) => {
  const [blur, setBlur] = useState(false);
  const [state, setState] = useState("text");
  const [showMap, setShowMap] = useState(false);
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();

  const onChangeHandler = (e) => {
    // eslint-disable-next-line no-shadow
    const { value } = e.target;
    dispatch(createChecklistActions.changeChecklistValue({ value, id }));
  };

  const checklistTypeHandler = (str) => {
    if (state === str) return;
    dispatch(createChecklistActions.defineChecklist({ str, id }));
    setState(str);
    dispatch(createChecklistActions.removeImage());
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

  const ImgSelected = value?.image && (
    <div className={`${`creation-item__img`}${value.image ? " active" : ""}`}>
      <img src={value.image} alt="" />
      <button
        onClick={() => dispatch(createChecklistActions.removeImage(id))}
        className="creation-item__remove"
        type="button"
      >
        <TrashIcon />
      </button>
    </div>
  );

  return (
    <li
      onFocus={() => setBlur(id)}
      onBlur={() => setBlur(false)}
      className="creation-item"
      ref={provide.innerRef}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...provide.draggableProps}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...provide.dragHandleProps}
    >
      <div className="creation-item__wrap">
        <div
          className={`creation-item__number SFPro-600${
            inValid ? " invalid" : ""
          }`}
        >
          <ChecklistDots />
          {number}.
        </div>
        <div className="creation-item__inner">
          <label
            className={`creation-item__name${inValid ? " invalid" : ""}`}
            htmlFor={id}
          >
            <input
              onChange={(e) => onChangeHandler(e)}
              value={description}
              type="text"
              id={id}
            />
          </label>
          {list_type === "image" && !value.image && selectImg}
          {ImgSelected}
          {list_type === "coordinates" && (
            <>
              <GeneralMap setShowMap={setShowMap} creation id={id} />
              <CSSTransition in={showMap} timeout={300} unmountOnExit>
                <PopupMap show={showMap} onHide={() => setShowMap(false)}>
                  <GeneralMap popup creation id={id} />
                </PopupMap>
              </CSSTransition>
            </>
          )}
          {inValid && (
            <span className="creation-item__invalid">
              {translate("creationOfChecklist.max")}
            </span>
          )}
        </div>
      </div>
      {blur === id && (
        <CreationChecklistItemEdit
          typeChecklistHandler={checklistTypeHandler}
          id={id}
        />
      )}
    </li>
  );
};

export default CreationChecklistItem;
