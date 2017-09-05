import client from './client'
import { getRootUrl } from '../utils/api'

export default {
  index: () => {
    return client.get(`${getRootUrl()}/categories`)
  }
}
