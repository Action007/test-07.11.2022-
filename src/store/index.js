import { configureStore } from "@reduxjs/toolkit";
import { checklistAPI } from "../services/checklistService";
import { createChecklistReducer } from "./createChecklistSlice";

const store = configureStore({
  reducer: {
    createChecklistReducer,
    [checklistAPI.reducerPath]: checklistAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checklistAPI.middleware),
});

export default store;
