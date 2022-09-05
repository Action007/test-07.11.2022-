/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import getPercent from "../utils/getPercent";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    percent: 0,
    savedCounter: 0,
  },
  reducers: {
    tokenVerification(state) {
      const cookies = new Cookies();
      const token = cookies.get("Token");
      state.token = token;
    },
    userVerification(state) {
      const cookies = new Cookies();
      const UserInfo = cookies.get("UserInfo");
      state.user = UserInfo;
    },
    setToken(state, action) {
      const token = action.payload;
      const cookies = new Cookies();
      cookies.set("Token", token, { path: "/", maxAge: 604800 });
      state.token = token;
    },
    resetToken(state) {
      const cookies = new Cookies();
      cookies.remove("Token", { path: "/", maxAge: 604800 });
      state.token = null;
    },
    setUser(state, action) {
      const user = action.payload;
      const cookies = new Cookies();
      cookies.set("UserInfo", user, { path: "/", maxAge: 604800 });
      state.user = user;
    },
    resetUser(state) {
      const cookies = new Cookies();
      cookies.remove("UserInfo", { path: "/", maxAge: 604800 });
      state.user = null;
    },
    setSavedCounter(state, action) {
      const savedCounter = action.payload;
      state.savedCounter = savedCounter;
    },
    setPercentActiveChecklist(state, action) {
      const { completed_counter, active_checklists_counter } = action.payload;
      state.percent = getPercent(completed_counter, active_checklists_counter);
    },
  },
});

export const authSliceActions = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
