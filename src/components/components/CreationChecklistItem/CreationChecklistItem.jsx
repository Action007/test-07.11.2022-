import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import CreationChecklistItemEdit from "../CreationChecklistItemEdit/CreationChecklistItemEdit";
import "./CreationChecklistItem.scss";

import { ReactComponent as ChecklistDots } from "../../../assets/images/icon/checklistDots.svg";
import { ReactComponent as ImgIcon } from "../../../assets/images/icon/img.svg";
import { ReactComponent as TrashIcon } from "../../../assets/images/icon/trash.svg";
import CreationChecklistMap from "../CreationChecklistMap/CreationChecklistMap";

const CreationChecklistItem = ({ provide, description, type, number, id }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [blur, setBlur] = useState(false);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const { value } = e.target;
    dispatch(createChecklistActions.changeChecklistValue({ value, id }));
  };

  const checklistTypeHandler = (str) => {
    dispatch(createChecklistActions.defineChecklist({ str, id }));
  };

  const selectImg = (
    <label className="creation-item__img" htmlFor={id + 1}>
      <ImgIcon />
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
        id={id + 1}
      />
      <span className="SFPro-500">Add image</span>
    </label>
  );

  const ImgSelected = selectedImage && (
    <div className={`${`creation-item__img`}${selectedImage ? " active" : ""}`}>
      <img
        alt="not fount"
        width="250px"
        src={URL.createObjectURL(selectedImage)}
      />
      <button
        onClick={() => setSelectedImage(null)}
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
      onBlur={() => setBlur(id)}
      className="creation-item"
      ref={provide.innerRef}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...provide.draggableProps}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...provide.dragHandleProps}
    >
      <div className="creation-item__wrap">
        <div className="creation-item__number SFPro-600">
          <ChecklistDots />
          {number}.
        </div>
        <div className="creation-item__inner">
          <label className="creation-item__name" htmlFor={id}>
            <input
              onChange={(e) => onChangeHandler(e, id)}
              value={description}
              type="text"
              id={id}
            />
          </label>
          {type === "image" && !selectedImage && selectImg}
          {type === "map" && <CreationChecklistMap />}
          {ImgSelected}
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
