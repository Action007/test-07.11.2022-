import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./CreationChecklistItems.scss";

import { ReactComponent as ChecklistDots } from "../../../assets/images/icon/checklistDots.svg";

const CreationChecklistItems = ({
  checklistItems,
  changeChecklistDescHandler,
  onDragEndHandler,
}) => (
  <DragDropContext onDragEnd={onDragEndHandler}>
    <Droppable droppableId="characters">
      {(provided) => (
        <ul
          className="creation__items"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {checklistItems.map((checklist, index) => (
            <Draggable
              key={checklist.id}
              draggableId={checklist.id}
              index={index}
            >
              {(provide) => (
                <li
                  className="creation-item"
                  ref={provide.innerRef}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...provide.draggableProps}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...provide.dragHandleProps}
                >
                  <div className="creation-item__number SFPro-600">
                    <ChecklistDots />
                    {index + 1}.
                  </div>
                  <label className="creation-item__name" htmlFor={checklist.id}>
                    <input
                      onChange={(e) =>
                        changeChecklistDescHandler(e.target.value, checklist.id)
                      }
                      value={checklist.description}
                      type="text"
                      id={checklist.id}
                    />
                  </label>
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

export default CreationChecklistItems;
