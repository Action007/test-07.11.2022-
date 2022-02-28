/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import uniqueID from "../utils/uniqueId";

const createChecklistSlice = createSlice({
  name: "createChecklist",
  initialState: {
    checklists: [],
    tags: [],
    markers: [],
  },
  reducers: {
    addChecklist(state) {
      state.checklists = [
        ...state.checklists,
        { id: uniqueID(), list_type: "text", description: "" },
      ];

      localStorage.setItem("appData", JSON.stringify(state.checklists));
    },
    defineChecklist(state, action) {
      const { str, id } = action.payload;

      if (str === "text") {
        state.checklists = state.checklists.map((item) =>
          item.id === id ? { ...item, list_type: "text" } : item
        );
      } else if (str === "image") {
        state.checklists = state.checklists.map((item) =>
          item.id === id ? { ...item, list_type: "image" } : item
        );
      } else if (str === "map") {
        state.checklists = state.checklists.map((item) =>
          item.id === id ? { ...item, list_type: "map" } : item
        );
      } else if (str === "delete") {
        state.checklists = state.checklists.filter((item) => item.id !== id);
      }

      localStorage.setItem("appData", JSON.stringify(state.checklists));
    },
    changeChecklistValue(state, action) {
      const { value, id } = action.payload;

      state.checklists = state.checklists.map((item) =>
        item.id === id ? { ...item, description: value } : item
      );

      localStorage.setItem("appData", JSON.stringify(state.checklists));
    },
    dropAndDownChecklists(state, action) {
      const result = action.payload;

      if (!result.destination) return;

      const items = [...state.checklists];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      state.checklists = items;

      localStorage.setItem("appData", JSON.stringify(state.checklists));
    },
    addTag(state, action) {
      const name = action.payload;
      state.tags = [...state.tags, { id: uniqueID(), name }];
    },
    removeTag(state, action) {
      const id = action.payload;
      state.tags = state.tags.filter((tag) => tag.id !== id);
    },
    addCoordinate(state, action) {
      state.markers = [action.payload];
    },
    removeCoordinate(state) {
      state.markers = [];
    },
  },
});

export const createChecklistActions = createChecklistSlice.actions;

export default createChecklistSlice;
