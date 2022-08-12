import { olcheckAPI } from ".";

const checklistAPI = olcheckAPI.injectEndpoints({
  endpoints: (build) => ({
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
    resetForgotPassword: build.mutation({
      query: (body) => ({
        url: "/api/v1/users/reset_forgot_password",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignInWithGoogleMutation,
  useLogOutMutation,
  useForgotPasswordMutation,
  useResetForgotPasswordMutation,
} = checklistAPI;
