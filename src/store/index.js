import { configureStore } from "@reduxjs/toolkit";
import { olcheckAPI } from "../services";
import { createChecklistReducer } from "./createChecklistSlice";
import { homePageFiltersSliceReducer } from "./homePageFiltersSlice";
import { authSliceReducer } from "./authSlice";

const store = configureStore({
  reducer: {
    [olcheckAPI.reducerPath]: olcheckAPI.reducer,
    createChecklistReducer,
    authSliceReducer,
    homePageFiltersSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(olcheckAPI.middleware),
});

export default store;
