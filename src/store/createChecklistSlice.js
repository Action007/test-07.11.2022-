/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import uniqueID from "../utils/uniqueID";

const createChecklistSlice = createSlice({
  name: "createChecklist",
  initialState: {
    title: { value: "", isValid: true, isNotContainLinks: true },
    checklist_items: [],
    tags: [],
    category: { id: "", value: "", isValid: true },
    validateAfterSubmit: false,
  },
  reducers: {
    addTitle(state, action) {
      const value = action.payload;

      state.title.value = value;
    },
    addChecklist(state) {
      if (state.checklist_items.length > 24) return;
      state.checklist_items = [
        ...state.checklist_items,
        { id: uniqueID(), list_type: "text", description: "", value: {} },
      ];
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
        item.id === id
          ? { ...item, list_type: "image", value: { ...item.value, image } }
          : item
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
    addCategory(state, action) {
      const { id, value } = action.payload;

      if (id) {
        state.category = { id, value, isValid: true };
      } else {
        state.category = { id: "", value: "", isValid: false };
      }
    },
    setValidateAfterSubmit(state) {
      state.validateAfterSubmit = true;
    },
    defineChecklist(state, action) {
      const { defineType, id } = action.payload;

      if (defineType === "text") {
        state.checklist_items = state.checklist_items.map((item) =>
          item.id === id
            ? { ...item, list_type: "text", value: { ...item.value } }
            : item
        );
      } else if (defineType === "link") {
        state.checklist_items = state.checklist_items.map((item) =>
          item.id === id
            ? {
                ...item,
                list_type: "link",
                value: {
                  ...item.value,
                  link: item.value.link ? item.value.link : "",
                },
              }
            : item
        );
      } else if (defineType === "image") {
        state.checklist_items = state.checklist_items.map((item) =>
          item.id === id
            ? { ...item, list_type: "image", value: { ...item.value } }
            : item
        );
      } else if (defineType === "coordinates") {
        state.checklist_items = state.checklist_items.map((item) =>
          item.id === id
            ? { ...item, list_type: "coordinates", value: { ...item.value } }
            : item
        );
      } else if (defineType === "delete") {
        state.checklist_items = state.checklist_items.filter(
          (item) => item.id !== id
        );
      }
    },
    changeChecklistInputValue(state, action) {
      const { type, inputValue, id } = action.payload;

      if (type === "link") {
        state.checklist_items = state.checklist_items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              value: {
                ...item.value,
                link: inputValue,
              },
            };
          }
          return item;
        });
      } else if (type === "text") {
        state.checklist_items = state.checklist_items.map((item) => {
          if (item.id === id) {
            const isValid =
              inputValue.trim().length < 151 && inputValue.trim().length > 1;
            return {
              ...item,
              inValid: !isValid,
              description: inputValue,
            };
          }
          return item;
        });
      }
    },
    isTitleValid(state) {
      const titleIsValid =
        state.title.value.trim().length > 9 &&
        state.title.value.trim().length < 151;
      state.title.isValid = titleIsValid;
    },
    isTitleNotContainLinks(state) {
      const titleNotContainLinks = !state.title.value.includes("://");
      state.title.isNotContainLinks = titleNotContainLinks;
    },
    isValidDescription(state) {
      state.checklist_items = state.checklist_items.map((item) =>
        item.description.trim().length < 151 &&
        item.description.trim().length > 1
          ? { ...item, inValid: false }
          : { ...item, inValid: true }
      );
    },
    onSubmitClear(state) {
      state.title = { value: "", isValid: true, isNotContainLinks: true };
      state.checklist_items = [];
      state.tags = [];
      state.category = { value: "", isValid: true, id: "" };
      state.validateAfterSubmit = false;
    },
    editChecklist(state, action) {
      const { checklist_items, name, tags, categories } = action.payload;
      const checklistItems = checklist_items.map((item) =>
        item.id ? item : { ...item, id: uniqueID() }
      );

      state.title = { value: name, isValid: true, isNotContainLinks: true };
      state.checklist_items = checklistItems;
      state.tags = tags;
      state.category = {
        id: categories[0].id,
        isValid: true,
        value: categories[0].value,
      };
    },
    // react-beautiful-dnd
    dropAndDownChecklists(state, action) {
      const result = action.payload;

      if (!result.destination) return;

      const items = [...state.checklist_items];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      state.checklist_items = items;
    },
  },
});

export const createChecklistActions = createChecklistSlice.actions;
export const createChecklistReducer = createChecklistSlice.reducer;
