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
        <div class="users-container">
          <div class="user-content"
               v-for="route in getUserByHours(departureTime)"
               :key="route.id"
          >
            <img class="user-picture" v-bind:src="route.user.picture" v-bind:alt="route.user.name" />
            <div class="user-detail">
              {{ route.user.name }} conduit
              {{ route.user.car }}
              <q-btn
                color="primary"
                label="+ détails"
                size="sm"
                @click="openModal(route.user.id)"
              />
            </div>
          </div>
        </div>
        <q-modal v-model="modalOpened" :content-css="{padding: '50px'}">
          <h4 class="text-primary">Détail du conducteur {{ userInfo.name }}</h4>
          <div>
            <p><q-icon name="directions_car" />{{ userInfo.car }}</p>
            <p><q-icon name="phone" />{{ userInfo.tel }}</p>
            <p><q-icon name="bookmark" />{{ userInfo.address }}</p>
          </div>
          <q-btn color="secondary" @click="modalOpened = false" label="Close" />
        </q-modal>
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
              picture: '/assets/logo.png',
              car: 'Opel corsa',
              tel: '0650505050',
              address: '47 rue arsène orillard 86000 poitiers'
            }
          },
          {
            departureTime: '08:00',
            user: {
              id: 2,
              name: 'test1',
              picture: '/assets/logo.png',
              car: 'Opel Zafira'
            }
          },
          {
            departureTime: '08:00',
            user: {
              id: 30,
              name: 'test2',
              picture: '/assets/logo.png',
              car: 'Renaud twingo'
            }
          },
          {
            departureTime: '09:00',
            user: {
              id: 32,
              name: 'test3',
              picture: '/assets/logo.png',
              car: 'Renaud twingo'
            }
          },
          {
            departureTime: '08:15',
            user: {
              id: 40,
              name: 'test4',
              picture: '/assets/logo.png',
              car: 'Renaud mégane'
            }
          },
          {
            departureTime: '08:30',
            user: {
              id: 41,
              name: 'test5',
              picture: '/assets/logo.png',
              car: 'Fiat 500'
            }
          },
          {
            departureTime: '08:15',
            user: {
              id: 42,
              name: 'test6',
              picture: '/assets/logo.png',
              car: 'Renaud twingo'
            }
          },
          {
            departureTime: '10:00',
            user: {
              id: 50,
              name: 'test7',
              picture: '/assets/logo.png',
              car: 'Renaud twingo'
            }
          },
          {
            departureTime: '13:00',
            user: {
              id: 55,
              name: 'test8',
              picture: '/assets/logo.png',
              car: 'BMW Z3'
            }
          },
          {
            departureTime: '12:15',
            user: {
              id: 58,
              name: 'test9',
              picture: '/assets/logo.png',
              car: 'Renaud twingo'
            }
          }
        ],
        modalOpened: false,
        userInfo : {
          picture: '',
          name: '',
          car: '',
          tel: '',
          address: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      getUserByHours(hour) {
        return this.routes.filter((route) => {
          return route.departureTime === hour
        })
      },
      openModal(id) {
        console.log(id)
        this.routes.forEach(route => {
          if(route.user.id === id) {
            this.userInfo.picture = route.user.picture
            this.userInfo.name = route.user.name
            this.userInfo.car = route.user.car
            this.userInfo.tel = route.user.tel
            this.userInfo.address = route.user.address
          }
        })
        this.modalOpened = true
      },
      closeModal(modal) {
        modal.hide()
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
