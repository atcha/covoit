
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {
        name: 'home',
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
        name: 'itineraire',
        path: '/proposer/ajout/itineraire',
        component: () => import('pages/trip/AddTripRoute')
      },
      {
        path: '/historique',
        component: () => import('pages/Historic')
      },
      {
        path: '/profile',
        component: () => import('pages/Profile')
      }
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/login'),
    children: [
      {
        name: 'login',
        path: '',
        component: () => import('pages/login/login')
      }
    ]
  },
  {
    path: '/facebook/login',
    beforeEnter(to, from, next) {
      window.location = '/api/auth/facebook'
    }
  },
  {
    path: '/google/login',
    beforeEnter(to, from, next) {
      window.location = '/api/auth/google'
    }
  },
  {
    path: '/logout',
    beforeEnter(to, from, next) {
      window.location = '/api/logout'
    }
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404'),
  },
]
