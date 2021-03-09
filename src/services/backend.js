import Axios from 'axios'
const client = Axios.create({
  baseURL: `${process.env.VUE_APP_BACKEND}`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: false,
  timeout: 10000
})
export default {
  instance: client,
}