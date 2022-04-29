/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const navigationChecklistSlice = createSlice({
  name: "heightForScroll",
  initialState: {
    pageValue: 1,
    categoryValue: "",
    tagValue: "",
    searchValue: "",
  },
  reducers: {
    setTagID(state, action) {
      const id = action.payload;
      state.tagValue = `&search_tag_ids[]=${id}`;
    },
    setCategoryID(state, action) {
      const id = action.payload;
      state.categoryValue = `&search_category_ids[]=${id}`;
    },
    setSearchValue(state, action) {
      const value = action.payload;
      state.searchValue = `search_value=${value}&`;
    },
    setPageValue(state, action) {
      const value = action.payload;
      state.pageValue = value;
    },
  },
});

export const navigationChecklistActions = navigationChecklistSlice.actions;
export const navigationChecklistReducer = navigationChecklistSlice.reducer;
