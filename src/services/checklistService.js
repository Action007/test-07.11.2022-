import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const API_KEY = process.env.REACT_APP_HOSTNAME;

// eslint-disable-next-line import/prefer-default-export
export const checklistAPI = createApi({
  reducerPath: "checklistAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_KEY,
  }),
  tagTypes: ["Checklist"],
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    console.log(token);
    if (token) {
      headers.set("authentication", `Bearer ${token}`);
    }
    return headers;
  },
  endpoints: (build) => ({
    fetchChecklist: build.query({
      query: (url) => `/api/v1${url}`,
      providesTags: () => ["Checklist"],
    }),
    fetchTagsChecklist: build.query({
      query: (url) => `/api/v1/tags/search?value=${url}`,
      providesTags: () => ["Tags"],
    }),
    fetchSavesChecklists: build.query({
      query: () => ({
        url: "/api/v1/checklists_auth?search_type=saved&page=1&per_page=1000",
      }),
      invalidatesTags: ["SaveChecklist"],
    }),
    fetchAccount: build.query({
      query: () => ({
        url: "/api/v1/account",
      }),
      invalidatesTags: ["Account"],
    }),
    createChecklist: build.mutation({
      query: (checklist) => ({
        url: "/api/v1/checklists_auth",
        method: "POST",
        body: checklist,
      }),
      invalidatesTags: ["Checklist"],
    }),
    updateChecklist: build.mutation({
      query: (checklist) => ({
        url: `/api/v1/checklists_auth/${checklist.id}/update`,
        method: "PUT",
        body: checklist,
      }),
      invalidatesTags: ["Checklist"],
    }),
    supportChecklist: build.mutation({
      query: (body) => ({
        url: `/api/v1/support_issues`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Support"],
    }),
    saveChecklist: build.mutation({
      query: (id) => ({
        url: `/api/v1/checklists_auth/${id}/save`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: id,
      }),
      invalidatesTags: ["SaveChecklist"],
    }),
    unsaveChecklist: build.mutation({
      query: (id) => ({
        url: `/api/v1/checklists_auth/${id}/unsave`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: id,
      }),
      invalidatesTags: ["SaveChecklist"],
    }),
    likeChecklist: build.mutation({
      query: (id) => ({
        url: `/api/v1/checklists_auth/${id}/like`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: id,
      }),
      invalidatesTags: ["LikeChecklist"],
    }),
    dislikeChecklist: build.mutation({
      query: (id) => ({
        url: `/api/v1/checklists_auth/${id}/unlike`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: id,
      }),
      invalidatesTags: ["DislikeChecklist"],
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
