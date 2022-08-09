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
    deleteActiveChecklist: build.mutation({
      query: (body) => ({
        url: `/api/v1/active_checklists/${body.id}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body,
      }),
      invalidatesTags: ["ActiveChecklist", "Account"],
    }),
  }),
  overrideExisting: false,
});

export const { useFetchActiveChecklistQuery } = checklistAPI;
export const { useAddActiveChecklistMutation } = checklistAPI;
export const { useCheckActiveChecklistItemMutation } = checklistAPI;
export const { useDeleteActiveChecklistMutation } = checklistAPI;
