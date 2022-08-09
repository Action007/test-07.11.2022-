import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

// eslint-disable-next-line import/prefer-default-export
export const olcheckAPI = createApi({
  reducerPath: "checklistAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: HOSTNAME,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().authSliceReducer;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
