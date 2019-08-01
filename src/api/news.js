import request from '@/utils/request'

// 获取列表
export function list(query) {
  return request({
    url: '/news/list',
    method: 'get',
    params: query
  })
}

// 获取详情
export function detail(query) {
  return request({
    url: '/news/detail',
    method: 'get',
    params: query
  })
}

// 新增
export function add(query) {
  return request({
    url: '/news/add',
    method: 'post',
    params: query
  })
}

// 更新
export function update(query) {
  return request({
    url: '/news/update',
    method: 'post',
    params: query
  })
}
