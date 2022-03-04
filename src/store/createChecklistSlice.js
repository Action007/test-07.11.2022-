/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import uniqueID from "../utils/uniqueId";

const createChecklistSlice = createSlice({
  name: "createChecklist",
  initialState: {
    title: "",
    checklists: [],
    tags: [],
  },
  reducers: {
    addTitle(state, action) {
      const value = action.payload;

      state.title = value;
    },
    addChecklist(state) {
      state.checklists = [
        ...state.checklists,
        { id: uniqueID(), list_type: "text", description: "" },
      ];
    },
    defineChecklist(state, action) {
      const { str, id } = action.payload;

      if (str === "text") {
        state.checklists = state.checklists.map((item) =>
          item.id === id ? { ...item, list_type: "text", value: {} } : item
        );
      } else if (str === "image") {
        state.checklists = state.checklists.map((item) =>
          item.id === id ? { ...item, list_type: "image", value: {} } : item
        );
      } else if (str === "coordinates") {
        state.checklists = state.checklists.map((item) =>
          item.id === id
            ? { ...item, list_type: "coordinates", value: {} }
            : item
        );
      } else if (str === "delete") {
        state.checklists = state.checklists.filter((item) => item.id !== id);
      }
    },
    changeChecklistValue(state, action) {
      const { value, id } = action.payload;

      state.checklists = state.checklists.map((item) =>
        item.id === id ? { ...item, description: value } : item
      );
    },
    dropAndDownChecklists(state, action) {
      const result = action.payload;

      if (!result.destination) return;

      const items = [...state.checklists];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      state.checklists = items;
    },
    addTag(state, action) {
      const name = action.payload;
      state.tags = [...state.tags, { id: uniqueID(), name }];
    },
    removeTag(state, action) {
      const id = action.payload;
      state.tags = state.tags.filter((tag) => tag.id !== id);
    },
    addImage(state, action) {
      const { id, image } = action.payload;
      state.checklists = state.checklists.map((item) =>
        item.id === id ? { ...item, value: { image } } : item
      );
    },
    removeImage(state, action) {
      const id = action.payload;
      state.checklists = state.checklists.map((item) =>
        item.id === id ? { ...item, value: {} } : item
      );
    },
    addCoordinate(state, action) {
      const { id, latLng } = action.payload;
      state.checklists = state.checklists.map((item) =>
        item.id === id ? { ...item, value: { coordinates: latLng } } : item
      );
    },
    removeCoordinate(state, action) {
      const id = action.payload;
      state.checklists = state.checklists.map((item) =>
        item.id === id ? { ...item, value: {} } : item
      );
    },
    isValid(state) {
      state.checklists = state.checklists.map((item) =>
        item.description.trim().length < 151 &&
        item.description.trim().length > 0
          ? { ...item, inValid: false }
          : { ...item, inValid: true }
      );
    },
  },
});

export const createChecklistActions = createChecklistSlice.actions;

export default createChecklistSlice;
