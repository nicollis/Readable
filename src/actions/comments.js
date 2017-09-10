import CommentsAPI from '../api/comments'
import { handleHttpResponse } from '../utils/handle-http-response'

export const GET_COMMENTS = 'GET_COMMENTS'
export const COMMENT_VOTE = 'COMMENT_VOTE'

export function getComments(post_id) {
  return (dispatch) => {
    return handleHttpResponse(dispatch, GET_COMMENTS, CommentsAPI.index(post_id), {post_id: post_id})
  }
}

export function commentVote(comment_id, vote) {
  return (dispatch) => {
    return handleHttpResponse(dispatch, COMMENT_VOTE, CommentsAPI.vote(comment_id, vote))
  } 
}
