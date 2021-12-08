import axios from '@/utils/request'

// 获取所有权限的列表
export const getAllPermissions = () => {
  return axios.request({
    url: '/permission/list',
    method: 'GET'
  })
}
