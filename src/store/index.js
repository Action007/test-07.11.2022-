import { configureStore } from "@reduxjs/toolkit";
import { checklistAPI } from "../services/checklistService";
import { createChecklistReducer } from "./createChecklistSlice";
import { navigationChecklistReducer } from "./navigationChecklistSlice";
import { authSliceReducer } from "./authSlice";

const store = configureStore({
  reducer: {
    [checklistAPI.reducerPath]: checklistAPI.reducer,
    navigationChecklistReducer,
    createChecklistReducer,
    authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checklistAPI.middleware),
});

export default store;
