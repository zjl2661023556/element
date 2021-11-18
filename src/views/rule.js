export const passwordValidate = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码长度不够'))
    } else {
      callback()
    }
  }
}
