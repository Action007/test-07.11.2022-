import { articlesAPI } from ".";

const authAPI = articlesAPI.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (body) => ({
        url: "https://demoblog.afeagroup.com/user/register",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          username: body.username,
          password: body.password,
          passconf: body.passconf,
        },
        method: "POST",
        body,
      }),
    }),
    // signIn: build.mutation({
    //   query: (body) => ({
    //     url: "",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: [],
    // }),
    // logOut: build.mutation({
    //   query: () => ({
    //     url: "",
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [],
    // }),
  }),
  overrideExisting: false,
});

export const { useSignUpMutation, useSignInMutation, useLogOutMutation } =
  authAPI;
