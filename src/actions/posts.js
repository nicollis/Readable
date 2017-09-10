import PostsAPI from '../api/posts'
import { handleHttpResponse } from '../utils/handle-http-response'

export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const POST_VOTE = 'POST_VOTE'



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
