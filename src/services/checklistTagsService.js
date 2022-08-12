import { olcheckAPI } from ".";

const checklistAPI = olcheckAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchSearchTags: build.query({
      query: (url) => `/api/v1/tags/search?value=${url}`,
    }),
    fetchTags: build.query({
      query: (tagsUrl) => `/api/v1/tags/search?${tagsUrl}`,
      providesTags: () => ["Tags"],
    }),
  }),
  overrideExisting: false,
});

export const { useFetchSearchTagsQuery, useFetchTagsQuery } = checklistAPI;
