/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const heightForScrollSlice = createSlice({
  name: "heightForScroll",
  initialState: {
    height: 0,
    headerHeight: 0,
  },
  reducers: {
    setHeight(state, action) {
      state.height = action.payload;
    },
    setHeaderHeight(state, action) {
      state.headerHeight = action.payload;
    },
  },
});

export const heightForScrollActions = heightForScrollSlice.actions;
export const heightForScrollReducer = heightForScrollSlice.reducer;
