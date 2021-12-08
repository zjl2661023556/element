import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/elements'
import 'element-plus/dist/index.css'
import initSvgIcon from './icons/index.js'
// 用户鉴权
import './permission.js'
// 导入i18n
import i18n from '@/i18n/index.js'

// 注册全局属性
import initFilters from '@/filters/index.js'

// 注册指令
import initDirectives from '@/directives/index'

// 引入样式的主入口
import './styles/index.scss'
// 加载svg的处理
const app = createApp(App)
initSvgIcon(app)
installElementPlus(app)
initDirectives(app)
initFilters(app)
app.use(store).use(router).use(i18n).mount('#app')
