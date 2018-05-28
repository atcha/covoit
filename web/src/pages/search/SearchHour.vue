<template>
  <q-page padding class="search-hour">
    <q-btn flat icon="arrow_back" @click="$router.go(-1)"/>
  </q-page>
</template>

<script>
  export default {
    name: "SearchHour",
    data() {
      return {
        routes: [
          {
            departureTime: '8:00',
            userId: 1
          },
          {
            departureTime: '8:00',
            userId: 2
          },
          {
            departureTime: '8:00',
            userId: 30
          },
          {
            departureTime: '9:00',
            userId: 32
          },
          {
            departureTime: '8:15',
            userId: 40
          },
          {
            departureTime: '8:30',
            userId: 41
          },
          {
            departureTime: '8:15',
            userId: 42
          },
          {
            departureTime: '10:00',
            userId: 50
          },
          {
            departureTime: '13:00',
            userId: 55
          },
          {
            departureTime: '12:15',
            userId: 58
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
