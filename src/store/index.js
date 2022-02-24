import { configureStore } from "@reduxjs/toolkit";
import createChecklist from "./createChecklistSlice";

const store = configureStore({
  reducer: { createChecklist: createChecklist.reducer },
});

export default store;
