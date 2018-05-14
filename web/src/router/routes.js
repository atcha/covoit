
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {
        path: '',
        component: () => import('pages/index')
      },
      {
        path: '/rechercher',
        component: () => import('pages/Search')
      },
      {
        path: '/proposer',
        component: () => import('pages/trip/Trip'),
      },
      {
        path: '/proposer/ajout',
        component: () => import('pages/trip/AddTrip')
      },
      {
        path: '/profile',
        component: () => import('pages/Profile')
      }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404'),
  },
]
