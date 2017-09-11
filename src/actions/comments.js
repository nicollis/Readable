import CommentsAPI from '../api/comments'
import { handleHttpResponse } from '../utils/handle-http-response'

export const GET_COMMENTS = 'GET_COMMENTS'
export const POST_COMMENT = 'POST_COMMENT'
export const COMMENT_VOTE = 'COMMENT_VOTE'
export const COMMENT_MODAL = 'COMMENT_MODAL'

export function getComments(post_id) {
  return (dispatch) => {
    return handleHttpResponse(dispatch, GET_COMMENTS, CommentsAPI.index(post_id), {post_id: post_id})
  }
}

export function postComment(payload) {
  return (dispatch) => {
    return handleHttpResponse(dispatch, POST_COMMENT, CommentsAPI.post(payload))
  }
}

export function commentVote(comment_id, vote) {
  return (dispatch) => {
    return handleHttpResponse(dispatch, COMMENT_VOTE, CommentsAPI.vote(comment_id, vote))
  } 
}

export function toggleCommentModal() {
  return {
    type: COMMENT_MODAL,
  }
}
