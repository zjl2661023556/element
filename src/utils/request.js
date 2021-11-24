import axios from 'axios'
// element ui 的报错机制
import { ElMessage } from 'element-plus'
// import { getItem } from '@/utils/storage.js'
// import { TOKEN } from '@/common/common.js'
// 导入store
import store from '@/store/index.js'
import { isCheckTimeOut } from './auth'
// 封装token
const server = axios.create({
  timeout: 5000,
  // baseURL: 'https://api.imooc-admin.lgdsunday.club/api'
  baseURL: '/api'
})

// 不需要登录（不需要token）就能访问的借口  白名单
// 1 const whiteUrl = ['/sys/login']
// 请求拦截  封装token
server.interceptors.request.use(
  (config) => {
    if (isCheckTimeOut()) {
      // 过期执行退出
      store.dispatch('user/logout')
      // 不应该请求
      return Promise.reject(new Error('token 过期'))
    }
    if (store.getters.token) {
      // 1 if (whiteUrl.includes(config.url) <= -1) {
      // 请求的不是login

      // 判断token 时候存在 不存在 不封装
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 1 }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 错误处理 服务器犯错误  消息提醒
// axios 响应拦截
server.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么  判断对的诗句还是错的数据
    const { success, data, message } = response.data
    if (success) {
      return data
    } else {
      ElMessage({
        type: 'error',
        message: message
      })
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // token 失效 code=401 单点登录 后台会返回特定的状态码 执行退出
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    // 服务器没有返回数据或者是服务器未知错误
    ElMessage({
      type: 'error',
      message: error.message
    })
    return Promise.reject(error)
  }
)

// 导出一个对象 封装token
export default server
