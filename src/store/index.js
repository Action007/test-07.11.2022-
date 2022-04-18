import { configureStore } from "@reduxjs/toolkit";
import { checklistAPI } from "../services/checklistService";
import { createChecklistReducer } from "./createChecklistSlice";
import { heightForScrollReducer } from "./heightForScrollSlice";

const store = configureStore({
  reducer: {
    heightForScrollReducer,
    createChecklistReducer,
    [checklistAPI.reducerPath]: checklistAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checklistAPI.middleware),
});

export default store;
