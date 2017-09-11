import CommentsAPI from '../api/comments'
import { handleHttpResponse } from '../utils/handle-http-response'

export const GET_COMMENTS = 'GET_COMMENTS'
export const POST_COMMENT = 'POST_COMMENT'
export const COMMENT_VOTE = 'COMMENT_VOTE'
export const COMMENT_MODAL = 'COMMENT_MODAL'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

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

export function deleteComment(comment_id) {
  return (dispatch) => {
    return handleHttpResponse(dispatch, DELETE_COMMENT, CommentsAPI.delete(comment_id), {comment_id: comment_id})
  }
}

export function updateComment(comment_id, payload) {
  return (dispatch) => {
    return handleHttpResponse(dispatch, UPDATE_COMMENT, CommentsAPI.put(comment_id, payload))
  }
}

export function editComment(comment_id) {
  return {
    type: EDIT_COMMENT,
    payload: comment_id
  }
}
