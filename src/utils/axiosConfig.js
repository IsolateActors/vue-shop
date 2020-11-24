import axios from 'axios'
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1'

// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    // console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default axios
