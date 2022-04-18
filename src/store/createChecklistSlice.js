/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import uniqueID from "../utils/uniqueID";

const createChecklistSlice = createSlice({
  name: "createChecklist",
  initialState: {
    title: { value: "", isValid: true },
    checklist_items: [],
    tags: [],
    category: "",
  },
  reducers: {
    addTitle(state, action) {
      const value = action.payload;

      state.title.value = value;
    },
    isTitleValid(state) {
      const titleIsValid =
        state.title.value.trim().length !== 0 &&
        state.title.value.trim().length < 151;

      state.title.isValid = titleIsValid;
    },
    addChecklist(state) {
      state.checklist_items = [
        ...state.checklist_items,
        { id: uniqueID(), list_type: "text", description: "", value: {} },
      ];
    },
    defineChecklist(state, action) {
      const { str, id } = action.payload;

      if (str === "text") {
        state.checklist_items = state.checklist_items.map((item) =>
          item.id === id
            ? { ...item, list_type: "text", value: { ...item.value } }
            : item
        );
      } else if (str === "link") {
        state.checklist_items = state.checklist_items.map((item) =>
          item.id === id
            ? { ...item, list_type: "link", value: { ...item.value, link: "" } }
            : item
        );
      } else if (str === "image") {
        state.checklist_items = state.checklist_items.map((item) =>
          item.id === id
            ? { ...item, list_type: "image", value: { ...item.value } }
            : item
        );
      } else if (str === "coordinates") {
        state.checklist_items = state.checklist_items.map((item) =>
          item.id === id
            ? { ...item, list_type: "coordinates", value: { ...item.value } }
            : item
        );
      } else if (str === "delete") {
        state.checklist_items = state.checklist_items.filter(
          (item) => item.id !== id
        );
      }
    },
    changeChecklistInputValue(state, action) {
      const { type, value, id, inputValue } = action.payload;

      state.checklist_items = state.checklist_items.map((item) => {
        if (item.id === id) {
          return inputValue.trim().length < 151 && inputValue.trim().length > 0
            ? { ...item, inValid: false }
            : { ...item, inValid: true };
        }
        return item;
      });

      if (type === "link") {
        state.checklist_items = state.checklist_items.map((item) =>
          item.id === id ? { ...item, value: { link: value } } : item
        );
      } else if (type === "text") {
        state.checklist_items = state.checklist_items.map((item) =>
          item.id === id ? { ...item, description: value } : item
        );
      }
    },
    dropAndDownChecklists(state, action) {
      const result = action.payload;

      if (!result.destination) return;

      const items = [...state.checklist_items];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      state.checklist_items = items;
    },
    addTag(state, action) {
      const tag = action.payload;
      state.tags = [...state.tags, tag];
    },
    removeTag(state, action) {
      const id = action.payload;
      state.tags = state.tags.filter((tag) => tag.id !== id);
    },
    addImage(state, action) {
      const { id, image } = action.payload;
      state.checklist_items = state.checklist_items.map((item) =>
        item.id === id ? { ...item, value: { image } } : item
      );
    },
    removeImage(state, action) {
      const id = action.payload;
      state.checklist_items = state.checklist_items.map((item) =>
        item.id === id ? { ...item, value: {} } : item
      );
    },
    addCoordinate(state, action) {
      const { id, latLng } = action.payload;
      state.checklist_items = state.checklist_items.map((item) =>
        item.id === id
          ? { ...item, value: { ...item.value, coordinates: latLng } }
          : item
      );
    },
    removeCoordinate(state, action) {
      const id = action.payload;
      state.checklist_items = state.checklist_items.map((item) =>
        item.id === id
          ? { ...item, value: { ...item.value, coordinates: null } }
          : item
      );
    },
    addCategory(state, action) {
      const category = action.payload;
      state.category = category;
    },
    isValid(state) {
      state.checklist_items = state.checklist_items.map((item) =>
        item.description.trim().length < 151 &&
        item.description.trim().length > 0
          ? { ...item, inValid: false }
          : { ...item, inValid: true }
      );
    },
    onSubmitClear(state) {
      state.title = { value: "", isValid: true };
      state.checklist_items = [];
      state.tags = [];
      state.category = "";
    },
    editChecklist(state, action) {
      const { checklist_items, name, tags } = action.payload;
      const checklistItems = checklist_items.map((item) =>
        item.id ? item : { ...item, id: uniqueID() }
      );

      state.title = { value: name, isValid: true };
      state.checklist_items = checklistItems;
      state.tags = tags;
    },
  },
});

export const createChecklistActions = createChecklistSlice.actions;
export const createChecklistReducer = createChecklistSlice.reducer;
