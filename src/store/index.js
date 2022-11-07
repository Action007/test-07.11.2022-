import { configureStore } from "@reduxjs/toolkit";
import { articlesAPI } from "../services";
import { authSliceReducer } from "./authSlice";

const store = configureStore({
  reducer: {
    [articlesAPI.reducerPath]: articlesAPI.reducer,
    authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesAPI.middleware),
});

export default store;
