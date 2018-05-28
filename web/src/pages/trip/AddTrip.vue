<template>
  <q-page padding class="trip-add">
    <q-btn flat icon="arrow_back" @click="$router.go(-1)"/>
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
      <q-item-separator v-show="locationSelected"/>
      <q-item v-show="locationSelected">
        <q-datetime
          :value="goTime"
          @change="val => { goTime = val }"
          type="time"
          format24h
          placeholder="Aller"
          ok-label="Ok"
          cancel-label="Annuler"
          hide-underline
          class="full-width"
        />
      </q-item>
      <q-item-separator v-show="locationSelected"/>
      <q-item v-show="locationSelected">
        <q-datetime
          :value="backTime"
          @change="val => { backTime = val }"
          type="time"
          format24h
          placeholder="Retour"
          ok-label="Ok"
          cancel-label="Annuler"
          hide-underline
          class="full-width"
        />
      </q-item>
      <q-item-separator v-show="locationSelected"/>
      <q-item v-show="locationSelected">
        <q-option-group
          left-label
          inline
          type="checkbox"
          v-model="days"
          :options="[
            { label: 'L', value: 'lundi' },
            { label: 'M', value: 'mardi' },
            { label: 'M', value: 'mercredi' },
            { label: 'J', value: 'jeudi' },
            { label: 'V', value: 'vendredi' },
            { label: 'S', value: 'samedi' },
            { label: 'D', value: 'dimanche' }
          ]"
        />
      </q-item>
      <q-item-separator v-show="locationSelected"/>
      <q-item v-show="locationSelected">
        <q-btn
          label="Continuer"
          color="primary"
          class="full-width no-shadow"
          @click="$router.push({ name: 'itineraire', params: { start: location.value } })"
        />
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
        location: null,
        locationSelected: false,
        timeModalOpened: false,
        goTime: "",
        backTime: "",
        days: []
      }
    },
    methods: {
      search (terms, done) {
        this.$http.get('/api/geocode/address/' + terms).then(response => {
          done(this.parseAddress(response.body))
        })
      },
      selected (terms) {
        this.location = terms
        this.locationSelected = true
      },
      parseAddress(addresses) {
        return addresses.map(address => {
          return {
            label: address.properties.label,
            value: address.properties.label,
            coordinates: address.geometry.coordinates
          }
        })
      },
      toggleDays(day) {
        this.days.push(day);
      }
    },
    mounted () {
    }
  }
</script>

<style>
</style>
