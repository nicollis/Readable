import PostsAPI from '../api/posts'
import { handleHttpResponse } from '../utils/handle-http-response'

export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'



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
