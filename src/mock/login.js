import { param2Obj } from '@/utils'

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
  id: 12,
  name: '权限列表',
  code: 'system.permissions.index',
  link: '/system/permissions/index'
}, {
  id: 13,
  name: '权限添加',
  code: 'system.permissions.add',
  link: '/system/permissions/add'
}, {
  id: 14,
  name: '权限修改',
  code: 'system.permissions.edit',
  link: '/system/permissions/edit'
}, {
  id: 15,
  name: '网站配置管理',
  code: 'system.site',
  link: '/system/site/index'
}, {
  id: 16,
  name: '网站配置',
  code: 'system.site.index',
  link: '/system/site/index'
}, {
  id: 8,
  name: '新闻管理',
  code: 'news',
  link: '/news'
}, {
  id: 9,
  name: '新闻列表',
  code: 'news.index',
  link: '/news/index'
}, {
  id: 10,
  name: '新闻添加',
  code: 'news.add',
  link: '/news/add'
}, {
  id: 11,
  name: '新闻修改',
  code: 'news.edit',
  link: '/news/edit'
}]

const _examplePermissions = [{
  link: '/example'
}, {
  link: '/example/table'
}, {
  link: '/example/tree'
}, {
  link: '/form/index'
}]

const userMap = {
  admin: {
    token: 'admin_token_12345',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    // roles: ['admin'],
    roles: ['editor'],
    permissions: [{
      link: '/home'
    }, ...permissionsArr, ..._examplePermissions]
  },
  editor: {
    roles: ['editor'],
    token: 'editor_token_12345',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    permissions: [{
      link: '/home'
    }, ..._examplePermissions]
  }
}

export default {
  loginByUsername: config => {
    const { username } = param2Obj(config.url)

    // console.log(param2Obj(config.url))

    if (userMap[username]) {
      return {
        status: 200,
        message: '登录成功',
        data: userMap[username]
      }
    } else {
      return {
        status: 2002,
        message: '登录失败',
        data: null
      }
    }
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    let uInfo = null
    for (const ukey in userMap) {
      if (userMap[ukey].token === token) {
        uInfo = userMap[ukey]
        continue
      }
    }
    if (uInfo) {
      return {
        status: 200,
        message: '获取用户信息成功',
        data: uInfo
      }
    } else {
      return {
        status: 50008,
        message: '获取用户信息失败',
        data: null
      }
    }
  },
  logout(config) {
    const { token } = param2Obj(config.url)

    console.log(token)

    return {
      status: 200,
      message: '退出成功',
      data: null
    }
  }
}
