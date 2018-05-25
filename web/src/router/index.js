import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import VueRessource from 'vue-resource'
import * as VueGoogleMaps from 'vue2-google-maps'
import GoogleMap from '../secret/googleMap';
import {Dialog} from 'quasar'

Vue.use(VueRouter)
Vue.use(VueRessource)
Vue.use(VueGoogleMaps, {
  load: {
    key: GoogleMap.key,
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
  scrollBehavior: () => ({y: 0}),
  routes
});

Vue.http.interceptors.push(function (request) {

  // modify request

  // return response callback
  return function (response) {
    let errorDialog = {
      title: 'Attention',

      // optional
      color: 'primary',

      // optional; we want an "OK" button
      ok: true, // takes i18n value, or String for "OK" button label
    };
    let goToLogin = () => {
      window.location = "/login"
    };
    switch (response.status) {
      case 401:
        errorDialog.message = "Vous devez être connecté pour utiliser cette fonctionnalité.";
        Dialog.create(errorDialog)
          .then(goToLogin)
          .catch(goToLogin);
        break;
      case 403:
        errorDialog.message = "Vous n'avez pas les droits requis pour utiliser cette fonctionnalité.";
        Dialog.create(errorDialog);
        break;
      case 500:
        errorDialog.message = "Une erreur est survenue, veuillez nous excuser pour la gêne occasionnée.";
        Dialog.create(errorDialog);
        break;
    }
  };
});


export default Router
