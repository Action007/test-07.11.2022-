import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

// eslint-disable-next-line import/prefer-default-export
export const checklistAPI = createApi({
  reducerPath: "checklistAPI",
  tagTypes: ["Checklist"],
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
  endpoints: (build) => ({
    fetchChecklist: build.query({
      query: (url) => `/api/v1${url}`,
      providesTags: () => ["Checklist"],
    }),
    fetchActiveChecklist: build.query({
      query: (url) => `/api/v1${url}`,
      providesTags: () => ["ActiveChecklist"],
    }),
    fetchAccount: build.query({
      query: () => "/api/v1/account",
      providesTags: () => ["Account"],
    }),
    fetchChecklistForSupport: build.query({
      query: (checklistID) =>
        `/api/v1/checklists/${checklistID}?page=1&per_page=10`,
    }),
    fetchSearchTags: build.query({
      query: (url) => `/api/v1/tags/search?value=${url}`,
    }),
    fetchTags: build.query({
      query: (tagsUrl) => `/api/v1/tags/search?${tagsUrl}`,
      providesTags: () => ["Tags"],
    }),
    fetchUserProfile: build.query({
      query: (nickname) => `/api/v1/users?user_nickname=${nickname}`,
      providesTags: () => ["UserProfile"],
    }),
    fetchCountryNames: build.query({
      query: () => "/api/v1/account/valid_country_names",
    }),
    signUp: build.mutation({
      query: (body) => ({
        url: "/api/v1/users/sign_up",
        method: "POST",
        body,
      }),
    }),
    signIn: build.mutation({
      query: (body) => ({
        url: "/api/v1/users/sign_in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Account", "UserProfile"],
    }),
    signInWithGoogle: build.mutation({
      query: (body) => ({
        url: `/api/v1/auth/google/callback`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Account"],
    }),
    logOut: build.mutation({
      query: () => ({
        url: "/api/v1/users/logout",
        method: "DELETE",
      }),
      invalidatesTags: ["Account", "UserProfile"],
    }),
    forgotPassword: build.mutation({
      query: (body) => ({
        url: "/api/v1/users/forgot_password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: build.mutation({
      query: (body) => ({
        url: "/api/v1/users/reset_password",
        method: "POST",
        body,
      }),
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
    editAccount: build.mutation({
      query: (info) => ({
        url: `/api/v1/account`,
        method: "PUT",
        body: info,
      }),
      invalidatesTags: ["Account"],
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
      invalidatesTags: ["Account"],
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
      invalidatesTags: ["Account"],
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
    addActiveChecklist: build.mutation({
      query: (body) => ({
        url: "/api/v1/active_checklists",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body,
      }),
      invalidatesTags: ["ActiveChecklist", "Account"],
    }),
    deleteActiveChecklist: build.mutation({
      query: (body) => ({
        url: `/api/v1/active_checklists/${body.id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["ActiveChecklist", "Account"],
    }),
    checkActiveChecklistItem: build.mutation({
      query: (body) => ({
        url: `/api/v1/active_checklists/${body.id}/${body.checklist_item_id}/action`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body,
      }),
      invalidatesTags: ["ActiveChecklist", "Account"],
    }),
    addComment: build.mutation({
      query: (body) => ({
        url: `/api/v1/checklists_auth/${body.checklist_id}/comment`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Checklist"],
    }),
    likeComment: build.mutation({
      query: (body) => ({
        url: `/api/v1/checklists_auth/${body.checklist_id}/${body.comment_id}/like`,
        method: "POST",
        body,
      }),
    }),
    unlikeComment: build.mutation({
      query: (body) => ({
        url: `/api/v1/checklists_auth/${body.checklist_id}/${body.comment_id}/unlike`,
        method: "POST",
        body,
      }),
    }),
    deleteComment: build.mutation({
      query: (body) => ({
        url: `/api/v1/checklists_auth/${body.checklist_id}/${body.comment_id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Checklist"],
    }),
  }),
});
