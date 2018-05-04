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

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyADsBFHd9NtZc145Jm-9T84pFY9exMtDkA&libraries=places"></script>
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
        this.$http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+terms+'&key='+this.googleApiKey).then(response => {
          console.log(response.body)
        })
      },
      selected (terms) {
        console.log(terms)
      }
    },
    mounted () {
    }
  }
</script>

<style>
</style>
