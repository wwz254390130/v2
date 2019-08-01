import request from '@/utils/request'
// 获取文章列表
export function fetchTopicsList(query) {
  return request({
    url: '/api/topics',
    method: 'get',
    params: query
  })
}
// 获取文章详情
export function fetchTopics(id, query) {
  return request({
    url: '/api/topics/' + id + '/edit',
    method: 'get',
    params: query
  })
}
// 文章新增
export function createTopics(data) {
  return request({
    url: '/api/topics',
    method: 'post',
    data: data
  })
}
// 文章更新
export function updateTopics(id, data) {
  return request({
    url: '/api/topics/' + id,
    method: 'put',
    data: data
  })
}
