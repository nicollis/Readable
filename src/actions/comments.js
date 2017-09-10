import CommentsAPI from '../api/comments'
import { handleHttpResponse } from '../utils/handle-http-response'

export const GET_COMMENTS = 'GET_COMMENTS'

export function getComments(post_id) {
  return (dispatch) => {
    return handleHttpResponse(dispatch, GET_COMMENTS, CommentsAPI.index(post_id))
  }
}
