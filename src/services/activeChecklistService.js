import { olcheckAPI } from ".";

const checklistAPI = olcheckAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchActiveChecklist: build.query({
      query: (url) => `/api/v1${url}`,
      providesTags: () => ["ActiveChecklist"],
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
      invalidatesTags: ["ActiveChecklist"],
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
    }),
    deleteActiveChecklist: build.mutation({
      query: (body) => ({
        url: `/api/v1/active_checklists/${body.id}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchActiveChecklistQuery,
  useAddActiveChecklistMutation,
  useCheckActiveChecklistItemMutation,
  useDeleteActiveChecklistMutation,
} = checklistAPI;
