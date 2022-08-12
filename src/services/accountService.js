import { olcheckAPI } from ".";

const checklistAPI = olcheckAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchAccountInfo: build.query({
      query: () => "/api/v1/account",
      providesTags: () => ["AccountInfo"],
    }),
    fetchAccountWithNickname: build.query({
      query: (nickname) => `/api/v1/users?user_nickname=${nickname}`,
      providesTags: () => ["AccountNickname"],
    }),
    fetchCountryNames: build.query({
      query: () => "/api/v1/account/valid_country_names",
    }),
    editAccount: build.mutation({
      query: (info) => ({
        url: `/api/v1/account`,
        method: "PUT",
        body: info,
      }),
      invalidatesTags: ["AccountInfo"],
    }),
    resetAccountPassword: build.mutation({
      query: (body) => ({
        url: "/api/v1/users/reset_password",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchAccountInfoQuery,
  useFetchCountryNamesQuery,
  useFetchAccountWithNicknameQuery,
  useEditAccountMutation,
  useResetAccountPasswordMutation,
} = checklistAPI;
