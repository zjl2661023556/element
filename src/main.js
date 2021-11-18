import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import initSvgIcon from './icons/index.js'
// 用户鉴权
import './permission.js'
// 引入样式的主入口
import './styles/index.scss'
// 加载svg的处理
const app = createApp(App)
initSvgIcon(app)
app.use(store).use(router).use(ElementPlus).mount('#app')
