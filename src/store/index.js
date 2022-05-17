import { configureStore } from "@reduxjs/toolkit";
import { checklistAPI } from "../services/checklistService";
import { createChecklistReducer } from "./createChecklistSlice";
import { authSliceReducer } from "./authSlice";

const store = configureStore({
  reducer: {
    [checklistAPI.reducerPath]: checklistAPI.reducer,
    createChecklistReducer,
    authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checklistAPI.middleware),
});

export default store;
