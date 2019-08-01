/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/site/index',
  alwaysShow: true,
  meta: {
    title: 'system',
    icon: 'component',
    roles: ['admin']
  },
  children: [
    // 网站配置
    {
      path: 'site/index',
      component: () => import('@/views/site/index'),
      name: 'siteHome',
      meta: {
        title: 'siteHome',
        roles: ['admin']
      }
    },
    // 用户管理
    {
      path: 'users/index',
      component: () => import('@/views/users/index'),
      name: 'usersHome',
      meta: {
        title: 'usersHome',
        roles: ['admin']
      }
    },
    {
      path: 'users/add',
      component: () => import('@/views/users/add'),
      name: 'usersAdd',
      hidden: true,
      meta: {
        title: 'usersAdd',
        roles: ['admin']
      }
    },
    {
      path: 'users/edit/:id',
      component: () => import('@/views/users/edit'),
      name: 'usersEdit',
      hidden: true,
      meta: {
        title: 'usersEdit',
        roles: ['admin']
      }
    },
    // 角色管理
    {
      path: 'roles/index',
      component: () => import('@/views/roles/index'),
      name: 'rolesHome',
      meta: {
        title: 'rolesHome',
        roles: ['admin']
      }
    },
    {
      path: 'roles/add',
      component: () => import('@/views/roles/add'),
      name: 'rolesAdd',
      hidden: true,
      meta: {
        title: 'rolesAdd',
        roles: ['admin']
      }
    },
    {
      path: 'roles/edit/:id',
      component: () => import('@/views/roles/edit'),
      name: 'rolesEdit',
      hidden: true,
      meta: {
        title: 'rolesEdit',
        roles: ['admin']
      }
    },
    // 权限管理
    {
      path: 'permissions/index',
      component: () => import('@/views/permissions/index'),
      name: 'permissionsHome',
      meta: {
        title: 'permissionsHome',
        roles: ['admin']
      }
    },
    {
      path: 'permissions/add',
      component: () => import('@/views/permissions/add'),
      name: 'permissionsAdd',
      hidden: true,
      meta: {
        title: 'permissionsAdd',
        roles: ['admin']
      }
    },
    {
      path: 'permissions/edit/:id',
      component: () => import('@/views/permissions/edit'),
      name: 'permissionsEdit',
      hidden: true,
      meta: {
        title: 'permissionsEdit',
        roles: ['admin']
      }
    }
  ]
}

export default systemRouter
