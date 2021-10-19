import config from 'config'
import HTTPClient from '../../modules/http'

const client = new HTTPClient('publicapis', {
  baseURL: config.get('publicapis_host'),
})

export default client
