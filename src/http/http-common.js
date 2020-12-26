import config from './http-config'
import axios from 'axios'

export default {
  api: axios.create({
    withCredentials: true,
    baseURL: config['apiURL'],
    headers: {
      'Content-type': 'application/json',
    },
  }),
}
