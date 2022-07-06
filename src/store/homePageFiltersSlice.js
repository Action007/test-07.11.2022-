/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const homePageFiltersSlice = createSlice({
  name: "homePageFilters",
  initialState: {
    url: "",
  },
  reducers: {
    setUrl(state, action) {
      state.url = action.payload;
    },
  },
});

export const homePageFiltersSliceActions = homePageFiltersSlice.actions;
export const homePageFiltersSliceReducer = homePageFiltersSlice.reducer;
