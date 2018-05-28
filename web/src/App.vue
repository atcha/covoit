<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if(this.$q.cookies.get('covoit_cookie')) {
      this.userCookie = this.$q.cookies.get('covoit_cookie')
    } else {
      this.$router.push('/login')
    }

    console.log(this.$q.cookies.all())
  }
}
</script>

<style>
</style>
