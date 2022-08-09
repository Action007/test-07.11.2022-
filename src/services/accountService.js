import { olcheckAPI } from ".";

const checklistAPI = olcheckAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchAccountInfo: build.query({
      query: () => "/api/v1/account",
      providesTags: () => ["Account"],
    }),
    fetchAccountWithNickname: build.query({
      query: (nickname) => `/api/v1/users?user_nickname=${nickname}`,
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
      invalidatesTags: ["Account"],
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

export const { useFetchAccountInfoQuery } = checklistAPI;
export const { useFetchCountryNamesQuery } = checklistAPI;
export const { useFetchAccountWithNicknameQuery } = checklistAPI;
export const { useEditAccountMutation } = checklistAPI;
export const { useResetAccountPasswordMutation } = checklistAPI;
