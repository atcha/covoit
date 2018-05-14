<template>
  <q-layout view="hHh lpr fFf">
    <q-layout-header reveal>
      <q-toolbar
        color="white"
        text-color="primary"
      >
        <router-link to="/">
          <img src="../assets/logo-mdp.svg" width="50" height="50" />
        </router-link>

        <q-toolbar-title>
          {{title}}
          <div slot="subtitle">{{ subTitle }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-layout-footer>
      <q-toolbar class="row justify-between">
        <q-btn flat dense size="lg" icon="search" @click="$router.push('/rechercher')" />
        <q-btn flat dense size="lg" icon="directions_car" @click="$router.push('/proposer')" />
        <q-btn flat dense size="lg" icon="list" />
        <q-btn flat dense size="lg" icon="account_circle" @click="$router.push('/profile')" />
      </q-toolbar>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      title: 'CarPath',
      subTitle: 'Le covoiturage assuré'
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
