import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const API_KEY = process.env.REACT_APP_HOSTNAME;

// eslint-disable-next-line import/prefer-default-export
export const checklistAPI = createApi({
  reducerPath: "checklistAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_KEY,
  }),
  tagTypes: ["Checklist"],
  endpoints: (build) => ({
    fetchChecklist: build.query({
      query: (url) => url,
      providesTags: () => ["Checklist"],
    }),
    createChecklist: build.mutation({
      query: (checklist) => ({
        url: "/api/v1/checklists_auth",
        method: "POST",
        body: checklist,
      }),
      invalidatesTags: ["Checklist"],
    }),
    likeChecklist: build.mutation({
      query: (post) => ({
        url: `/api/v1/checklists_auth/${post.id}/like`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Checklist"],
    }),
    dislikeChecklist: build.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Checklist"],
    }),
    deleteChecklist: build.mutation({
      query: (id) => ({
        url: `/api/v1/checklists_auth/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Checklist"],
    }),
  }),
});
