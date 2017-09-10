import client from './client'
import { getRootUrl } from '../utils/api'

export default {
  index: () => {
    return client.get(`${getRootUrl()}/posts`)
  },
  show: (category) => {
    return client.get(`${getRootUrl()}/${category}/posts`)
  },
  get: (id) => {
    return client.get(`${getRootUrl()}/posts/${id}`)
  },
  vote: (id, vote) => {
    return client.post(`${getRootUrl()}/posts/${id}`).send({option: vote})
  }
}
