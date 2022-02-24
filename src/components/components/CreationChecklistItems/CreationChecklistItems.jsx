import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import CreationChecklistItemEdit from "../CreationChecklistItemEdit/CreationChecklistItemEdit";
import "./CreationChecklistItems.scss";

import { ReactComponent as ChecklistDots } from "../../../assets/images/icon/checklistDots.svg";
import { ReactComponent as ImgIcon } from "../../../assets/images/icon/img.svg";

const CreationChecklistItems = ({ checklistItems }) => {
  const [blur, setBlur] = useState(false);
  const dispatch = useDispatch();

  const onChangeHandler = (e, id) => {
    const { value } = e.target;
    dispatch(createChecklistActions.changeChecklistValue({ value, id }));
  };

  const checklistTypeHandler = (str, id) => {
    dispatch(createChecklistActions.defineChecklist({ str, id }));
  };

  return (
    <DragDropContext
      onDragEnd={(result) =>
        dispatch(createChecklistActions.dropAndDownChecklists(result))
      }
    >
      <Droppable droppableId="characters">
        {(provided) => (
          <ul
            className="creation-items"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {checklistItems.map(({ list_type, description, id }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provide) => (
                  <li
                    onFocus={() => setBlur(id)}
                    onBlur={() => setBlur(id)}
                    className="creation-items__wrapper"
                    ref={provide.innerRef}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...provide.draggableProps}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...provide.dragHandleProps}
                  >
                    <div className="creation-items__wrap">
                      <div className="creation-items__number SFPro-600">
                        <ChecklistDots />
                        {index + 1}.
                      </div>
                      <div className="creation-items__inner">
                        <label className="creation-items__name" htmlFor={id}>
                          <input
                            onChange={(e) => onChangeHandler(e, id)}
                            value={description}
                            type="text"
                            id={id}
                          />
                        </label>
                        {list_type === "image" && (
                          <label
                            className="creation-items__img"
                            htmlFor={id + 1}
                          >
                            <ImgIcon />
                            <input type="file" id={id + 1} />
                          </label>
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CreationChecklistItems;
