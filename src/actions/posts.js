import PostsAPI from '../api/posts'
import { handleHttpResponse } from '../utils/handle-http-response'

export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const POST_VOTE = 'POST_VOTE'
export const POST_POST = 'POST_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'


export function getPosts(category) {
  return(dispatch) => {
    if (category === undefined)
      return handleHttpResponse(dispatch, GET_POSTS, PostsAPI.index())
    else
      return handleHttpResponse(dispatch, GET_POSTS, PostsAPI.show(category))
  }
}

export function getPost(post_id) {
  return(dispatch) => {
    return handleHttpResponse(dispatch, GET_POST, PostsAPI.get(post_id))
  }
}

export function postVote(post_id, vote) {
  return (dispatch) => {
    return handleHttpResponse(dispatch, POST_VOTE, PostsAPI.vote(post_id, vote))
  }
}

export function postPost(payload) {
  return (dispatch) => {
    return handleHttpResponse(dispatch, POST_POST, PostsAPI.post(payload))
  }
}

export function deletePost(post_id) {
  return (dispatch) => {
    return handleHttpResponse(dispatch, DELETE_POST, PostsAPI.delete(post_id), {post_id: post_id})
  }
}

export function updatePost(post_id, payload) {
  return (dispatch) => {
    return handleHttpResponse(dispatch, UPDATE_POST, PostsAPI.put(post_id, payload))
  }
}
