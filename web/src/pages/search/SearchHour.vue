<template>
  <q-page padding class="search-hour">
    <q-btn class="btn-back" flat icon="arrow_back" @click="$router.go(-1)"/>
    <q-timeline color="secondary">
      <q-timeline-entry
        v-for="departureTime in filterByHours"
        :key="departureTime.id"
        subtitle="Heure de départ"
        v-bind:title="departureTime"
        side="left"
      >
        <div class="timeline-content"
             v-for="route in getUserByHours(departureTime)"
             :key="route.id"
        >
          {{ route.user.name }}
        </div>
      </q-timeline-entry>
    </q-timeline>
  </q-page>
</template>

<script>

  export default {
    name: "SearchHour",
    data() {
      return {
        departureTimes: [],
        routes: [
          {
            departureTime: '08:00',
            user: {
              id: 1,
              name: 'François CORNUAUD',
              picture: '/assets/logo.png'
            }
          },
          {
            departureTime: '08:00',
            user: {
              id: 2,
              name: 'test1',
              picture: '/assets/logo.png'
            }
          },
          {
            departureTime: '08:00',
            user: {
              id: 30,
              name: 'test2',
              picture: '/assets/logo.png'
            }
          },
          {
            departureTime: '09:00',
            user: {
              id: 32,
              name: 'test3',
              picture: '/assets/logo.png'
            }
          },
          {
            departureTime: '08:15',
            user: {
              id: 40,
              name: 'test4',
              picture: '/assets/logo.png'
            }
          },
          {
            departureTime: '08:30',
            user: {
              id: 41,
              name: 'test5',
              picture: '/assets/logo.png'
            }
          },
          {
            departureTime: '08:15',
            user: {
              id: 42,
              name: 'test6',
              picture: '/assets/logo.png'
            }
          },
          {
            departureTime: '10:00',
            user: {
              id: 50,
              name: 'test7',
              picture: '/assets/logo.png'
            }
          },
          {
            departureTime: '13:00',
            user: {
              id: 55,
              name: 'test8',
              picture: '/assets/logo.png'
            }
          },
          {
            departureTime: '12:15',
            user: {
              id: 58,
              name: 'test9',
              picture: '/assets/logo.png'
            }
          }
        ]
      }
    },
    mounted() {
    },
    methods: {
      getUserByHours(hour) {
        console.log(hour)
        return this.routes.filter((route) => {
          return route.departureTime === hour
        })
      }
    },
    computed: {
      filterByHours() {
        return [...new Set(this.routes.map(item => item.departureTime))].sort()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../css/pages/search/searchhour.styl'
</style>
