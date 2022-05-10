/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const navigationChecklistSlice = createSlice({
  name: "heightForScroll",
  initialState: {
    categoryValue: "",
    tagValue: "",
    searchValue: "",
    popularValue: "",
    latestValue: "",
  },
  reducers: {
    setTagID(state, action) {
      const id = action.payload;
      state.tagValue = `&search_tag_ids[]=${id}`;
    },
    setTagsID(state, action) {
      const id = action.payload;
      state.tagValue += `&search_tag_ids[]=${id}`;
    },
    removeTagsID(state) {
      state.tagValue = "";
    },
    removeTagID(state, action) {
      const id = action.payload;
      const address = state.tagValue.replace(`&search_tag_ids[]=${id}`, "");
      state.tagValue = address;
    },
    setCategoryID(state, action) {
      const id = action.payload;
      state.categoryValue = `&search_category_ids[]=${id}`;
    },
    removeCategoryID(state) {
      state.categoryValue = "";
    },
    setSearchValue(state, action) {
      const value = action.payload;
      state.searchValue = `search_value=${value}`;
    },
    setPopular(state) {
      state.popularValue = `popular=${true}`;
    },
    removePopular(state) {
      state.popularValue = "";
    },
    setLatest(state) {
      state.latestValue = `latest=${true}`;
    },
    removeLatest(state) {
      state.latestValue = "";
    },
  },
});

export const navigationChecklistActions = navigationChecklistSlice.actions;
export const navigationChecklistReducer = navigationChecklistSlice.reducer;
