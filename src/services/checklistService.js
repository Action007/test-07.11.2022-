import { olcheckAPI } from ".";

const checklistAPI = olcheckAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchChecklist: build.query({
      query: (url) => `/api/v1${url}`,
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
    updateChecklist: build.mutation({
      query: (checklist) => ({
        url: `/api/v1/checklists_auth/${checklist.id}/update`,
        method: "PUT",
        body: checklist,
      }),
      invalidatesTags: ["Checklist"],
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
      invalidatesTags: ["AccountInfo"],
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
      invalidatesTags: ["AccountInfo"],
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
    }),
    deleteChecklist: build.mutation({
      query: (id) => ({
        url: `/api/v1/checklists_auth/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Checklist"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchChecklistQuery,
  useCreateChecklistMutation,
  useUpdateChecklistMutation,
  useSaveChecklistMutation,
  useUnsaveChecklistMutation,
  useLikeChecklistMutation,
  useDislikeChecklistMutation,
  useDeleteChecklistMutation,
} = checklistAPI;
