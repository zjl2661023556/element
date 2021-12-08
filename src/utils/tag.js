const isNoTagArr = ['/', '/404', '/401', '/import']
export const isNoTag = (path) => {
  return isNoTagArr.includes(path)
}
