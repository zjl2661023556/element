import * as local from './storage.js'
import { TIME_STAMP, TIME_OUT } from '../common/common.js'
// 设置token 时间
export const setTimeStamp = () => {
  // 保存时间
  local.setItem(TIME_STAMP, Date.now())
}
// 获取token 保存的时间
const getTimeStamp = () => {
  return local.getItem(TIME_STAMP)
}
// 检查时间是否超时
export const isCheckTimeOut = () => {
  // 现在的时间-保存的时间》2小时  预计的 true 不过期  false 过期
  const currentTime = Date.now()
  /* eslint-disable-next-line */
  const time_stamp = getTimeStamp()
  /* eslint-disable-next-line */
  return currentTime - time_stamp <= TIME_OUT
}
