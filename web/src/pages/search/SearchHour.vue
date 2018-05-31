<template>
  <q-page padding class="search-hour">
    <q-btn class="btn-back" flat icon="arrow_back" @click="$router.go(-1)"/>
    <q-timeline color="secondary">
      <q-timeline-entry
        v-for="route in routes"
        :key="route.id"
        title="Event Title"
        subtitle=""
        side="left"
      >
        <div>
          Lorem ipsum dolor sit amet.
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
        departureTime: [],
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
    },
    mounted() {
      this.routes.sort(this.compare);

      console.log(this.routes)
      let lastDeparture = null
      this.departureTime = this.routes.filter((el, index, self) => {
        return self.departureTime.indexOf(el.departureTime) === index
      })
      // console.log(this.departureTime)
    },
    methods: {
      compare(a,b) {
        if (a.departureTime < b.departureTime)
          return -1;
        if (a.departureTime > b.departureTime)
          return 1;
        return 0;
      }

    }
  }
</script>

<style scoped>

</style>
