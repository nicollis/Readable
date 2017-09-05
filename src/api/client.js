import defaults from 'superagent-defaults'
import { getAuthHeader } from '../utils/api'

const client = defaults()

client
  .set('Accept', 'application/json')
  .on('request', (req) => {
    const auth = getAuthHeader()
    req.header.Authorization = auth
  })

export default client
