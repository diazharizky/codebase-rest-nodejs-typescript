import config from 'config'
import HTTPClient from '../../utils/http'

const client = new HTTPClient('publicapis', {
  baseURL: config.get('publicapis_host'),
})

export default client
