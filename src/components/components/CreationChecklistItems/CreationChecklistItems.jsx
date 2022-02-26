import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import CreationChecklistItem from "../CreationChecklistItem/CreationChecklistItem";

const CreationChecklistItems = ({ checklistItems }) => {
  const dispatch = useDispatch();

  return (
    <DragDropContext
      onDragEnd={(result) =>
        dispatch(createChecklistActions.dropAndDownChecklists(result))
      }
    >
      <Droppable droppableId="characters">
        {(provided) => (
          <ul
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {checklistItems.map(({ list_type, description, id }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provide) => (
                  <CreationChecklistItem
                    provide={provide}
                    type={list_type}
                    description={description}
                    number={index + 1}
                    id={id}
                  />
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
