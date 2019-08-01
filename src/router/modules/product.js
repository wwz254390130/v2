/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const productRouter = {
  path: '/product',
  component: Layout,
  redirect: '/product/index',
  alwaysShow: true,
  meta: {
    title: 'product',
    icon: 'component',
    roles: ['admin']
  },
  children: [
    // 用户管理
    {
      path: 'index',
      component: () => import('@/views/product/index'),
      name: 'productHome',
      meta: {
        title: 'productHome',
        roles: ['admin']
      }
    },
    {
      path: 'add',
      component: () => import('@/views/product/add'),
      name: 'productAdd',
      meta: {
        title: 'productAdd',
        roles: ['admin']
      }
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/product/edit'),
      name: 'productEdit',
      hidden: true,
      meta: {
        title: 'productEdit',
        roles: ['admin']
      }
    }
  ]
}

export default productRouter
