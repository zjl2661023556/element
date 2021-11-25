import { createStore } from 'vuex'
import user from './modules/user.js'
import getters from './modules/getters'
import app from './modules/app'
import theme from './modules/theme'
export default createStore({
  getters,
  modules: {
    user,
    app,
    theme
  }
})
