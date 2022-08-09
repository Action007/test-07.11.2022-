import { olcheckAPI } from ".";

const checklistAPI = olcheckAPI.injectEndpoints({
  endpoints: (build) => ({
    addComment: build.mutation({
      query: (body) => ({
        url: `/api/v1/checklists_auth/${body.checklist_id}/comment`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Checklist"],
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
        body,
      }),
      invalidatesTags: ["Checklist"],
    }),
  }),
  overrideExisting: false,
});

export const { useAddCommentMutation } = checklistAPI;
export const { useLikeCommentMutation } = checklistAPI;
export const { useUnlikeCommentMutation } = checklistAPI;
export const { useDeleteCommentMutation } = checklistAPI;
