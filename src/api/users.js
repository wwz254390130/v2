import request from '@/utils/request'

// 获取用户列表
export function fetchUsersList(query) {
  return request({
    url: '/users/list',
    method: 'get',
    params: query
  })
}

// 获取详情
export function fetchUsers(query) {
  return request({
    url: '/users/detail',
    method: 'get',
    params: query
  })
}

// 新增
export function createUsers(query) {
  return request({
    url: '/users/add',
    method: 'post',
    params: query
  })
}

// 更新
export function updateUsers(query) {
  return request({
    url: '/users/update',
    method: 'post',
    params: query
  })
}
