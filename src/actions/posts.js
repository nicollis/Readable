import PostsAPI from '../api/posts'
import { handleHttpResponse } from '../utils/handle-http-response'

export const GET_POSTS = 'GET_POSTS'
export const CHANGE_FILTER = 'CHANGE_FILTER'
export const GET_POST = 'GET_POST'

/* Filter Sort Options */
export const UP_VOTES = { value: 'UP_VOTES', label: 'Up Votes', sortColumn: 'voteScore' }
export const NEWEST = { value: 'NEWEST', label: 'Newest', sortColumn: 'timestamp' }

export const SORT_OPTIONS = [
  UP_VOTES,
  NEWEST,
]

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

export function changeFilter(sort) {
  const filter = SORT_OPTIONS.find(x => x.value === sort.value) || UP_VOTES
  return ({
    type: CHANGE_FILTER,
    filter: filter
  })
}
