import axios from 'axios'

const HTTP = axios.create({
  baseURL: `http://${location.hostname}:3000/`,
})

// HTTP.CancelToken = axios.CancelToken
// HTTP.isCancel = axios.isCancel

HTTP.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token')
    
    if(token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default HTTP