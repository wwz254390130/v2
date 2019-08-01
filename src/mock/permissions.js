import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 20

// `id`, `name`, `code`, `link`, `description`, `createid`, `createtime`

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id|1-100': 1,
    name: '@name()',
    code: 'product.index',
    link: '/product/index',
    description: Mock.Random.cparagraph(2),
    createid: 1,
    createtime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    'checkinfo|1-2': true
  }))
}

export default {
  getList: config => {
    return {
      status: 200,
      message: '获取成功',
      total: List.length,
      data: List
    }
  },
  add: config => {
    const _data = param2Obj(config.url)

    return {
      status: 200,
      message: '数据添加成功',
      data: _data
    }
  },
  update: config => {
    const _data = param2Obj(config.url)

    if (_data.type === 'del') {
      return {
        status: 200,
        message: '删除成功',
        data: ''
      }
    } else if (_data.type === 'check') {
      return {
        status: 200,
        message: '数据更新成功',
        data: _data.checkinfo === 'true' ? '启用' : '未启用'
      }
    } else {
      return {
        status: 200,
        message: '数据更新成功',
        data: _data.id
      }
    }
  },
  getDetail: config => {
    const { id } = param2Obj(config.url)

    return {
      status: 200,
      message: '数据获取成功',
      data: {
        info: id ? List[0] : ''
      }
    }
  }
}
