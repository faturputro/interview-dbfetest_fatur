const dashboardRoutes = [
  {
    path: 'accounts',
    name: 'Account',
    component: () => import('../views/Account.vue'),
    meta: {
      title: 'Account',
      icon: 'users',
    },
  },
  {
    path: 'payments',
    name: 'Payments',
    component: () => import('../views/AllPayment.vue'),
    meta: {
      title: 'Payment',
      icon: 'dollar-sign',
    },
  },
];

export default dashboardRoutes;