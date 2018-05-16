<template>
  <q-page padding>
    <h3 class="text-secondary">Rechercher un covoiturage autour de chez vous</h3>
    <q-list>
      <q-list-header>Votre recherche</q-list-header>
      <q-item-separator/>
      <q-item class="search-form">
        <q-input
          float-label="Votre lieu de départ"
          class="full-width"
          :before="[
            {
              icon: 'search'
            }
          ]"
        />
      </q-item>
      <q-item>

      </q-item>
    </q-list>
  </q-page>
</template>

<script>

  export default {
    name: 'Search',
    data() {
      return {
        markers: [],
        place: null,
      }
    },
    description: 'Autocomplete Example (#164)',
    methods: {
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
      }
    }

  }
</script>

<style>
</style>
