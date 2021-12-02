// 存储数据
export const setItem = (key, value) => {
  // 如果value 传入的是对象 需要转换为 字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

// 删除
export const deleteItem = (key) => {
  window.localStorage.removeItem(key)
}

// 清空所有
export const clearItem = () => {
  window.localStorage.clearItem()
}
