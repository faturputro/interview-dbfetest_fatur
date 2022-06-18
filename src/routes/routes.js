import dashboardRoutes from './dashboard'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/accounts',
    component: () => import('../layouts/default.vue'),
    children: dashboardRoutes,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/404.vue'),
  },
]

export default routes