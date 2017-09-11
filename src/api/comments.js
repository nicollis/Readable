import client from './client'
import { getRootUrl } from '../utils/api'

export default {
  index: (post_id) => {
    return client.get(`${getRootUrl()}/posts/${post_id}/comments`)
  },
  post: (payload) => {
    return client.post(`${getRootUrl()}/comments`).send(payload)
  },
  vote: (id, vote) => {
    return client.post(`${getRootUrl()}/comments/${id}`).send({option: vote})
  },
  delete: (comment_id) => {
    return client.delete(`${getRootUrl()}/comments/${comment_id}`)
  }
}
