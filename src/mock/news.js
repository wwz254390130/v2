import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 20
const rolesArr = [{
  id: 1,
  name: '超级管理员',
  permissions: []
}, {
  id: 2,
  name: '站点管理员',
  permissions: []
}, {
  id: 3,
  name: '文章发布员',
  permissions: []
}]

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id|1-100': 1,
    username: '@name()',
    'rolesid|1-3': 1,
    'roles|1': function() {
      const that = this
      let rname = ''

      rolesArr.forEach(item => {
        if (item.id === that.rolesid) {
          rname = item.name

          return false
        }
      })

      return rname
    },
    logintime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    loginip: Mock.Random.ip(),
    remark: Mock.Random.cparagraph(100),
    avatar: [{
      name: '头像.jpg',
      save_path: '',
      url: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/150/h/150'
    }],
    'checkinfo|1-2': true,
    'status|1': function() {
      return this.checkinfo ? '启用' : '未启用'
    }
  }))
}

export default {
  list: config => {
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
  detail: config => {
    const { id } = param2Obj(config.url)

    return {
      status: 200,
      message: '数据获取成功',
      data: {
        info: id ? List[0] : '',
        rolesArr: rolesArr
      }
    }
  }
}
