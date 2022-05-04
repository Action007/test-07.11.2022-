/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
  },
  reducers: {
    tokenVerification(state) {
      const cookies = new Cookies();
      const token = cookies.get("Token");
      state.token = token;
    },
    setToken(state, action) {
      const cookies = new Cookies();
      const token = action.payload;
      state.token = token;
      cookies.set("Token", token, { path: "/", maxAge: 604800 });
    },
    resetToken(state) {
      state.token = "";
    },
  },
});

export const authSliceActions = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
