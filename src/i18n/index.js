import { createI18n } from 'vue-i18n'
import zh from './lang/zh'
import en from './lang/en'
import store from '@/store/index'
const messages = {
  en: {
    msg: {
      ...en
    }
  },
  zh: {
    msg: {
      ...zh
    }
  }
}
// 定义语言的类型
const locale = store.getters.language || 'en'
// 初始化 i18n
const i18n = createI18n({
  legacy: false, // 配合vue3.2 组合式api
  globalInjection: true, // 全局注册一个t 函数
  locale,
  messages
})
export default i18n
