/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const demoRouter = [{
  path: '/example',
  component: Layout,
  redirect: '/demo/example/table',
  name: 'Example',
  meta: { title: 'Example', icon: 'example' },
  children: [{
    path: 'table',
    name: 'Table',
    component: () =>
          import('@/views/table/index'),
    meta: { title: 'Table', icon: 'table' }
  },
  {
    path: 'tree',
    name: 'Tree',
    component: () =>
          import('@/views/tree/index'),
    meta: { title: 'Tree', icon: 'tree' }
  }
  ]
},

{
  path: '/form',
  component: Layout,
  meta: { roles: ['admin'] },
  children: [{
    path: 'index',
    name: 'Form',
    component: () =>
        import('@/views/form/index'),
    meta: { title: 'Form', icon: 'form' }
  }]
},

{
  path: '/nested',
  component: Layout,
  redirect: '/demo/nested/menu1',
  name: 'nested',
  meta: {
    title: 'nested',
    icon: 'nested'
  },
  children: [{
    path: 'menu1',
    component: () =>
          import('@/views/nested/menu1/index'), // Parent router-view
    name: 'menu1',
    meta: { title: 'menu1' },
    children: [{
      path: 'menu1-1',
      component: () =>
              import('@/views/nested/menu1/menu1-1'),
      name: 'menu1-1',
      meta: { title: 'menu1-1' }
    },
    {
      path: 'menu1-2',
      component: () =>
              import('@/views/nested/menu1/menu1-2'),
      name: 'menu1-2',
      meta: { title: 'menu1-2' },
      children: [{
        path: 'menu1-2-1',
        component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-1'),
        name: 'menu1-2-1',
        meta: { title: 'menu1-2-1' }
      },
      {
        path: 'menu1-2-2',
        component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-2'),
        name: 'menu1-2-2',
        meta: { title: 'menu1-2-2' }
      }
      ]
    },
    {
      path: 'menu1-3',
      component: () =>
              import('@/views/nested/menu1/menu1-3'),
      name: 'menu1-3',
      meta: { title: 'menu1-3' }
    }
    ]
  },
  {
    path: 'menu2',
    component: () =>
          import('@/views/nested/menu2/index'),
    meta: { title: 'menu2' }
  }
  ]
}]

export default demoRouter
