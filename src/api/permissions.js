import request from '@/utils/request'

// 获取列表
export function fetchPermissionsList(query) {
  return request({
    url: '/permissions/list',
    method: 'get',
    params: query
  })
}

// 获取详情
export function fetchPermissions(query) {
  return request({
    url: '/permissions/detail',
    method: 'get',
    params: query
  })
}

// 新增
export function createPermissions(query) {
  return request({
    url: '/permissions/add',
    method: 'post',
    params: query
  })
}

// 更新
export function updatePermissions(query) {
  return request({
    url: '/permissions/update',
    method: 'post',
    params: query
  })
}
