import config from './http-config'
import axios from 'axios'

export default {
  api: axios.create({
    withCredentials: true,
    baseURL: config['baseURL'] + config['apiPath'],
    headers: {
      'Content-type': 'application/json',
    },
  }),
  maker_URL: config['baseURL'] + config['markerPath']
}
