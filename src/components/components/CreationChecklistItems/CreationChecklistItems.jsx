import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { createChecklistActions } from "../../../store/createChecklistSlice";
import CreationChecklistItem from "../CreationChecklistItem/CreationChecklistItem";

const CreationChecklistItems = ({ checklist_items }) => {
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
            style={{ overflow: "hidden" }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {checklist_items.map(
              ({ description, list_type, value, inValid, id }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provide) => (
                    <CreationChecklistItem
                      provide={provide}
                      description={description}
                      list_type={list_type}
                      number={index + 1}
                      value={value}
                      inValid={inValid}
                      id={id}
                    />
                  )}
                </Draggable>
              )
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CreationChecklistItems;
