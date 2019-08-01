import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 20
const permissionsArr = [{
  id: 1,
  name: '系统管理',
  code: 'system',
  link: '/system'
}, {
  id: 2,
  name: '用户列表',
  code: 'system.users.index',
  link: '/system/users/index'
}, {
  id: 3,
  name: '用户添加',
  code: 'system.users.add',
  link: '/system/users/add'
}, {
  id: 4,
  name: '用户修改',
  code: 'system.users.edit',
  link: '/system/users/edit'
}, {
  id: 5,
  name: '角色列表',
  code: 'system.roles.index',
  link: '/system/roles/index'
}, {
  id: 6,
  name: '角色添加',
  code: 'system.roles.add',
  link: '/system/roles/add'
}, {
  id: 7,
  name: '角色修改',
  code: 'system.roles.edit',
  link: '/system/roles/edit'
}, {
  id: 8,
  name: '产品管理',
  code: 'product',
  link: '/product'
}, {
  id: 9,
  name: '产品列表',
  code: 'product.index',
  link: '/product/index'
}, {
  id: 10,
  name: '产品添加',
  code: 'product.add',
  link: '/product/add'
}, {
  id: 11,
  name: '产品修改',
  code: 'product.edit',
  link: '/product/edit'
}]

// `id`, `name`, `permissions`, `description`, `createid`, `createtime`, `checkinfo`

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id|1-100': 1,
    name: '@name()',
    permissions: [2, 4, 8, 11],
    description: Mock.Random.cparagraph(10),
    createid: 1,
    createtime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    'checkinfo|1-2': true,
    'status|1': function() {
      return this.checkinfo ? '启用' : '未启用'
    }
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
    const tmpObj = {}
    const tmpArr = []

    permissionsArr.forEach(function(item) {
      const _key = item.code.split('.')[0]

      // 判断是否已存在该项
      if (!tmpObj[_key]) {
        tmpObj[_key] = {
          key: _key,
          name: item.name || _key,
          list: []
        }
      } else {
        tmpObj[_key].list.push(item)
      }
    })

    for (const k in tmpObj) {
      tmpArr.push(tmpObj[k])
    }

    return {
      status: 200,
      message: '数据获取成功',
      data: {
        info: id ? List[0] : '',
        permissionsList: tmpArr
      }
    }
  }
}
