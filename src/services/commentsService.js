import { olcheckAPI } from ".";

const checklistAPI = olcheckAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchComments: build.query({
      query: (params) => ({
        url: `/api/v1/checklists/${params.id}/comments`,
        params: {
          page: params.page,
          per_page: params.perPage,
        },
      }),
    }),
    createComment: build.mutation({
      query: (body) => ({
        url: `/api/v1/checklists_auth/${body.checklist_id}/comment`,
        method: "POST",
        body,
      }),
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
  useLazyFetchCommentsQuery,
  useCreateCommentMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
  useDeleteCommentMutation,
} = checklistAPI;
