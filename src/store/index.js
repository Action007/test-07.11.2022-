import { configureStore } from "@reduxjs/toolkit";
import { checklistAPI } from "../services/checklistService";
import { createChecklistReducer } from "./createChecklistSlice";
import { navigationChecklistReducer } from "./navigationChecklistSlice";
import { heightForScrollReducer } from "./heightForScrollSlice";

const store = configureStore({
  reducer: {
    heightForScrollReducer,
    navigationChecklistReducer,
    createChecklistReducer,
    [checklistAPI.reducerPath]: checklistAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checklistAPI.middleware),
});

export default store;
