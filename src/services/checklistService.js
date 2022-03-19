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
    fetchChecklist: build.query({
      query: (url) => url,
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
    likeChecklist: build.mutation({
      query: (post) => ({
        url: `/api/v1/checklists_auth/${post.id}/like`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    dislikeChecklist: build.mutation({
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
