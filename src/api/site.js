import request from '@/utils/request'

// 获取详情
export function get(query) {
  return request({
    url: '/site/detail',
    method: 'get',
    params: query
  })
}

// 更新
export function update(query) {
  return request({
    url: '/site/update',
    method: 'post',
    params: query
  })
}
