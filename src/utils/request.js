import axios from 'axios'
// element ui 的报错机制
import { ElMessage } from 'element-plus'
// import { getItem } from '@/utils/storage.js'
// import { TOKEN } from '@/common/common.js'
// 导入store
import store from '@/store/index.js'

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
    // 1 if (whiteUrl.includes(config.url) <= -1) {
    // 请求的不是login

    // 判断token 时候存在 不存在 不封装
    if (store.getters.token) {
      config.headers.Authorzation = `Bearer${store.getters.test}`
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
    // 服务器没有返回数据或者是服务器未知错误
    return Promise.reject(error)
  }
)

// 导出一个对象 封装token
export default server
