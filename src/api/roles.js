import request from '@/utils/request'

// 获取列表
export function fetchRolesList(query) {
  return request({
    url: '/roles/list',
    method: 'get',
    params: query
  })
}

// 获取详情
export function fetchRoles(query) {
  return request({
    url: '/roles/detail',
    method: 'get',
    params: query
  })
}

// 新增
export function createRoles(query) {
  return request({
    url: '/roles/add',
    method: 'post',
    params: query
  })
}

// 更新
export function updateRoles(query) {
  return request({
    url: '/roles/update',
    method: 'post',
    params: query
  })
}
