import axios from 'axios'

// 请求进度条
import NProgress from 'nprogress'

// axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1'
// axios.defaults.baseURL = 'http://119.23.53.78:8888/api/private/v1'
axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'

// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 进度条开启
    NProgress.start()
    // console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(function(config) {
  // console.log(config)

  // 进度条关闭
  NProgress.done()
  NProgress.remove()
  return config
})

export default axios
