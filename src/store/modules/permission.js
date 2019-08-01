import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, permissions, parent, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    let _routes = parent ? parent + '/' : ''
    _routes += route.path
    _routes = _routes.split('/:')[0]
    // console.log(_routes, permissions.indexOf(_routes))
    // path为*，或者包含在permissions中，或者管理员角色为admin时，将路由添加
    if (route.path === '*' || permissions.indexOf(_routes) >= 0 || permissions.indexOf(_routes + '/index') >= 0 || roles.indexOf('admin') >= 0) {
      // console.log(_routes)
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, permissions, _routes, roles)
      }

      return true
    }
    return false
  })

  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    // 根据permissions权限的link生成可访问的路由表
    PGenerateRoutes({ commit, state }, data) {
      return new Promise(resolve => {
        const { permissions, roles } = data
        const npermissions = []

        permissions.forEach(item => {
          if (item.link) {
            npermissions.push(item.link)
          }
        })

        const accessedRouters = filterAsyncRouter(asyncRouterMap, npermissions, '', roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
