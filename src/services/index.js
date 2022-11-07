import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const HOSTNAME = process.env.REACT_APP_HOSTNAME;

// eslint-disable-next-line import/prefer-default-export
export const articlesAPI = createApi({
  reducerPath: "articlesAPI",
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
