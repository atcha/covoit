<template>
  <q-layout view="hHh lpr fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
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
