import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// 白名单，无需登录可访问页面
const whiteList = ['/401', '/404', '/login']

function hasPermission(permissions, path, roles, parentPath) {
  let isNext = false

  // 超级管理员，白名单，首页path为空，特殊处理
  if (roles.indexOf('admin') >= 0 || whiteList.indexOf(path) >= 0 || path === '*' || !path) {
    isNext = true
  }

  if (!isNext) {
    permissions.forEach(item => {
      let _ppath = parentPath ? parentPath + '/' : ''
      _ppath += item.path

      // console.log(_ppath, path, _ppath === path || (_ppath + '/index') === path)
      if (_ppath === path || (_ppath + '/index') === path) {
        isNext = true
      } else if (!isNext && item.children && item.children.length) {
        isNext = hasPermission(item.children, path, roles, _ppath)
      }
    })
  }

  // console.log('前往页面：', path, isNext)
  return isNext
}

router.beforeEach((to, from, next) => {
  // 进度条开始
  NProgress.start()
  // 判断是否有token
  if (getToken()) {
    // 判断是否是登录页面
    if (to.path === '/login') {
      next({ path: '/' })
      // 进度条结束
      NProgress.done()
    } else {
      // 判断当前用户角色信息是否存在
      if (store.getters.roles.length === 0) {
        // 拉取用户信息
        store.dispatch('GetUserInfo').then(res => {
          // // 角色信息必须是数组，例如: ['editor','develop']
          const roles = res.data.roles
          // // 根据roles权限生成可访问的路由表
          // store.dispatch('GenerateRoutes', { roles }).then(() => {
          //   // 动态添加可访问路由表
          //   router.addRoutes(store.getters.addRouters)
          //   // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          //   next({ ...to, replace: true })
          // })

          // 根据权限信息生成路由表
          const permissions = res.data.permissions
          // 根据roles权限生成可访问的路由表
          store.dispatch('PGenerateRoutes', { permissions, roles }).then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '获取用户信息失败，请重新登录！')
            next({ path: '/' })
          })
        })
      } else {
        // console.log(store.getters.permission_routers)
        // 根据角色来获取权限，通过判断权限的link是否允许用户访问该链接
        if (hasPermission(store.getters.permission_routers, to.path, store.getters.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})

          NProgress.done()
        }
      }
    }
  } else {
    // 无token，在白名单则直接跳转
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 否则全部重定向到登录页
      next('/login')
      // 进度条结束
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 进度条结束
  NProgress.done()
})
