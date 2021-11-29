import { login, getUserInfo } from '@/api/user.js'
import md5 from 'md5'
import * as utils from '@/utils/storage.js'
import { TOKEN, USER_INFO } from '@/common/common.js'
import { setTimeStamp } from '@/utils/auth.js'
// 导入路由
import router from '@/router/index'
const state = {
  token: utils.getItem(TOKEN) || '',
  userInfo: utils.getItem(USER_INFO) || {}
}
const getters = {}
const mutations = {
  setToken(state, token) {
    // 保存 vuex
    state.token = token
    // 2.保存到本地存储中
    utils.setItem(TOKEN, token)
  },
  setUserInfo(state, userInfo) {
    // 保存 vuex
    state.userInfo = userInfo
    // 2.保存到本地存储中
    utils.setItem(USER_INFO, userInfo)
  }
}
const actions = {
  login({ commit }, info) {
    // 获取账号的密码信息
    // console.log(context)
    // console.log(info)
    const { username, password } = info
    return new Promise((resolve, reject) => {
      login({
        username,
        password: md5(password)
      })
        .then((res) => {
          // 保存token 到vuex 和本地存储中
          commit('setToken', res.token)
          // 记录token的获取时间
          setTimeStamp()
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    // 清理用户数据
    commit('setToken', '')
    commit('setUserInfo', {})
    router.push('/')
  },
  // 请求用户数据
  getUserInfo({ commit }) {
    // 发送axios
    getUserInfo()
      .then((res) => {
        // console.log(res)
        commit('setUserInfo', res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
