import Trip from 'pages/Trip'
import AddTrip from 'pages/AddTrip'
import Search from 'pages/Search'

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
        component: Search
      },
      {
        path: '/proposer',
        component: Trip,
        children: [
          { path: 'ajout', component: AddTrip }
        ]
      }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404'),
  },
]
