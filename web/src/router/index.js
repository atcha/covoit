import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import VueRessource from 'vue-resource'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueRouter)
Vue.use(VueRessource)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyADsBFHd9NtZc145Jm-9T84pFY9exMtDkA',
    libraries: 'places',
  },
})

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default Router
