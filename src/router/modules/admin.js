/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const adminRouter = {
  path: '/admin',
  component: Layout,
  redirect: '/admin/index',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'admin',
    icon: 'lock',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/admin/index'),
      name: 'adminHome',
      meta: {
        title: 'adminHome',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'manager',
      component: () => import('@/views/admin/manager'),
      name: 'manager',
      meta: {
        title: 'manager',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'menu',
      component: () => import('@/views/admin/menu'),
      name: 'menu',
      meta: {
        title: 'menu',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'property',
      component: () => import('@/views/admin/property'),
      name: 'property',
      meta: {
        title: 'property',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
  ]
}

export default adminRouter
