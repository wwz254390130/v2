/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const topicsRouter = {
  path: '/topics',
  component: Layout,
  redirect: '/topics/index',
  alwaysShow: true,
  meta: {
    title: 'topics',
    icon: 'component',
    roles: ['admin']
  },
  children: [
    // 用户管理
    {
      path: 'index',
      component: () => import('@/views/topics/index'),
      name: 'topicsHome',
      meta: {
        title: 'topicsHome',
        roles: ['admin']
      }
    },
    {
      path: 'add',
      component: () => import('@/views/topics/add'),
      name: 'topicsAdd',
      meta: {
        title: 'topicsAdd',
        roles: ['admin']
      }
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/topics/edit'),
      name: 'topicsEdit',
      hidden: true,
      meta: {
        title: 'topicsEdit',
        roles: ['admin']
      }
    }
  ]
}

export default topicsRouter
