<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    const userCookie = this.$q.cookies.get('covoit_cookie');
    if(userCookie) {
      this.userCookie = userCookie
    } else {
      this.$router.push('/login')
    }

    console.log(this.$q.cookies.all())
  }
}
</script>

<style>
</style>
