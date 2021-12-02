const isNoTagArr = ['/about', '/404', '/401', '/import']
export const isNoTag = (path) => {
  return isNoTagArr.includes(path)
}
