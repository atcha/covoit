<template>
  <q-page padding class="trip-add">
    <q-btn flat icon="arrow_back" @click="$router.push('/proposer')"/>
    <q-list>
      <q-list-header>Votre Lieu de départ</q-list-header>
      <q-item-separator/>
      <q-item>
        <!-- Adds a separator between results -->
        <q-search v-model="terms" class="full-width">
          <q-autocomplete
            separator
            @search="search"
            @selected="selected"
          />
        </q-search>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
  export default {
    name: 'AddTrip',
    data() {
      return {
        terms: null,
        googlePlaces: null,
        googleApiKey: 'AIzaSyADsBFHd9NtZc145Jm-9T84pFY9exMtDkA'
      }
    },
    methods: {
      search (terms, done) {
        console.log(terms);
        this.$http.get('/api/geocode/address/' + terms).then(response => {
          done(this.parseAddress(response.body))
        })
      },
      selected (terms) {
        console.log(terms)
      },
      parseAddress(addresses) {
        return addresses.map(address => {
          return {
            label: address.properties.label,
            value: address.properties.label
          }
        })
      }
    },
    mounted () {
    }
  }
</script>

<style>
</style>
