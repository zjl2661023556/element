import dayjs from 'dayjs'

const dataFilter = (value, format = 'YYYY-MM-DD') => {
  // dayjs 转化成标准的事件格式
  let val
  if (!isNaN(value)) {
    val = parseInt(value)
    return dayjs(val).format(format)
  } else {
    return '时间不能转换'
  }
}
export default (app) => {
  app.config.globalProperties.$filters = {
    dataFilter: dataFilter
  }
}
