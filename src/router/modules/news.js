/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const newsRouter = {
  path: '/news',
  component: Layout,
  redirect: '/news/index',
  alwaysShow: true,
  meta: {
    title: 'news',
    icon: 'component',
    roles: ['admin']
  },
  children: [
    // 用户管理
    {
      path: 'index',
      component: () => import('@/views/news/index'),
      name: 'newsHome',
      meta: {
        title: 'newsHome',
        roles: ['admin']
      }
    },
    {
      path: 'add',
      component: () => import('@/views/news/add'),
      name: 'newsAdd',
      hidden: true,
      meta: {
        title: 'newsAdd',
        roles: ['admin']
      }
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/news/edit'),
      name: 'newsEdit',
      hidden: true,
      meta: {
        title: 'newsEdit',
        roles: ['admin']
      }
    }
  ]
}

export default newsRouter
