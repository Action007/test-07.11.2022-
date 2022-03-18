import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const API_KEY = process.env.REACT_APP_HOSTNAME;

// eslint-disable-next-line import/prefer-default-export
export const checklistAPI = createApi({
  reducerPath: "checklistAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_KEY,
  }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    fetchAllChecklists: build.query({
      query: (limit) =>
        `/api/v1/checklists_auth?page=${limit[0]}&per_page=${limit[1]}`,
      providesTags: () => ["Post"],
    }),
    createChecklists: build.mutation({
      query: (post) => ({
        url: `/posts`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    updateChecklists: build.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    deleteChecklists: build.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
