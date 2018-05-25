<template>
  <q-page class="flex flex-center home">
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      userCookie: ''
    }
  },
  mounted() {
    // if(this.$q.cookies.get('covoit_cookie'))
    //   this.userCookie = this.$q.cookies.get('covoit_cookie')
    //
    // console.log(this.$q.cookies.all())
  }
}
</script>

<style lang="stylus" scoped>
  @import "../css/pages/home.styl"
</style>
