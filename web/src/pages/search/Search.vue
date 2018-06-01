<template>
  <q-page padding>
    <q-btn class="btn-back" flat icon="arrow_back" @click="$router.go(-1)"/>
    <h3 class="text-secondary">Rechercher un covoiturage autour de chez vous</h3>
    <q-list>
      <q-list-header>Votre recherche</q-list-header>
      <q-item-separator/>
      <q-item class="search-form">
        <!-- Adds a separator between results -->
        <q-search v-model="terms" class="full-width" placeholder="Votre lieu de départ">
          <q-autocomplete
            separator
            @search="search"
            @selected="selected"
          />
        </q-search>
      </q-item>
      <q-item-separator/>
      <q-item v-if="userStore && userStore.user && userStore.user.address && userStore.user.address.label">
        <q-btn color="secondary" @click="launchUserSearch">Utiliser votre adresse de référence : {{userStore.user.address.label}}</q-btn>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>

  import UsersStore from '../../store/UsersStore';

  export default {
    name: 'Search',
    data() {
      return {
        markers: [],
        place: null,
        address: '',
        location: '',
        terms: '',
        userStore: UsersStore
      }
    },
    description: 'Autocomplete Example (#164)',
    methods: {
      search (terms, done) {
        this.$http.get('/api/geocode/address/' + terms).then(response => {
          done(this.parseAddress(response.body))
        })
      },
      selected (terms) {
        this.$router.push({ name: 'searchhour', params: { start: terms } })
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
      setDescription(description) {
        this.description = description;
      },
      setPlace(place) {
        this.place = place
      },
      usePlace(place) {
        if (this.place) {
          this.markers.push({
            position: {
              lat: this.place.geometry.location.lat(),
              lng: this.place.geometry.location.lng(),
            }
          })
          this.place = null;
        }
      },
      launchUserSearch(){
        this.selected(this.userStore.user.address);
      }
    }
  }
</script>

<style>
</style>
