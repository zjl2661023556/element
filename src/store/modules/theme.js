import { setItem, getItem } from '@/utils/storage'
import { MYCOLOR } from '@/common/common'
export default {
  namespaced: true,
  state: {
    myColor: getItem(MYCOLOR) || '#cccccc'
  },
  mutations: {
    // 设置主题色
    setMyColor(state, color) {
      setItem(MYCOLOR, color)
      state.myColor = color
    }
  }
}
