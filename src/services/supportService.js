import { olcheckAPI } from ".";

const checklistAPI = olcheckAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchChecklistForSupport: build.query({
      query: (checklistID) =>
        `/api/v1/checklists/${checklistID}?page=1&per_page=10`,
    }),
    supportChecklist: build.mutation({
      query: (body) => ({
        url: `/api/v1/support_issues`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useFetchChecklistForSupportQuery, useSupportChecklistMutation } =
  checklistAPI;
