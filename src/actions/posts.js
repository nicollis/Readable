import PostsAPI from '../api/posts'
import { handleHttpResponse } from '../utils/handle-http-response'

export const GET_POSTS = 'GET_POSTS'

export function getPosts(category) {
  return(dispatch) => {
    if (category === undefined)
      return handleHttpResponse(dispatch, GET_POSTS, PostsAPI.index())
    else
      return handleHttpResponse(dispatch, GET_POSTS, PostsAPI.show(category))
  }
}
