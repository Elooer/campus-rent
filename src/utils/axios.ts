import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://43.138.133.249:5523',
  timeout: 5000,
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    let token = localStorage.getItem('camps_token')
    if (token && token !== '') {
      // 因为config.headers是可选属性,可能为undefined
      config.headers = config.headers || {}
      config.headers.Authorization = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  result => {
    return result.data
  },
  err => {
    return Promise.reject(err)
  }
)

export default instance
