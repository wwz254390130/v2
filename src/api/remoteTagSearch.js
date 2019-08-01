import request from '@/utils/request'

export function userSearch(name) {
  return request({
    url: '/search/user',
    method: 'get',
    params: { name }
  })
}

export function tagSearch(name) {
  return request({
    url: '/search/user',
    method: 'get',
    params: { name }
  })
}
