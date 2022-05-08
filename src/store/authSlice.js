/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
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
      cookies.set("Token", token, { path: "/", maxAge: 604800 });
      state.token = token;
    },
    resetToken(state) {
      const cookies = new Cookies();
      cookies.remove("Token", { path: "/", maxAge: 604800 });
      state.token = "";
    },
    setUser(state, action) {
      const user = action.payload;
      state.user = user;
    },
    resetUser(state) {
      state.user = null;
    },
  },
});

export const authSliceActions = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
