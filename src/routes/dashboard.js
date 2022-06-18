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
    children: [
      {
        path: 'incoming',
        name: 'Incoming',
        component: () => import('../views/Account.vue'),
        meta: {
          title: 'Incoming Payment',
          icon: 'arrow-down',
        },
      },
      {
        path: 'outgoing',
        name: 'Outgoing',
        component: () => import('../views/Account.vue'),
        meta: {
          title: 'Outgoing Payment',
          icon: 'arrow-up',
        },
      },
    ],
  },
];

export default dashboardRoutes;