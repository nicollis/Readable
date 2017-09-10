import client from './client'
import { getRootUrl } from '../utils/api'

export default {
  index: (post_id) => {
    return client.get(`${getRootUrl()}/posts/${post_id}/comments`)
  },
  vote: (id, vote) => {
    return client.post(`${getRootUrl()}/comments/${id}`).send({option: vote})
  }
}
