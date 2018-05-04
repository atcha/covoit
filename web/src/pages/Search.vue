<template>
  <q-page padding>
    <h3 class="text-secondary">Rechercher un covoiturage autour de chez vous</h3>
    <q-list>
      <q-list-header>Votre recherche</q-list-header>
      <q-item-separator/>
      <q-item class="search-form">
        <div tabindex="-1" class="q-if row no-wrap items-end relative-position q-input q-search text-primary">
          <i aria-hidden="true" class="q-icon q-if-control q-if-control-before material-icons">search</i>
          <div class="q-if-inner col row no-wrap relative-position">
            <GmapAutocomplete placeholder="Votre adresse" @place_changed="setPlace" class="col q-input-target q-no-input-spinner text-left"></GmapAutocomplete>
          </div>
        </div>
        <q-btn dense outline color="primary" label="Ajouter" @click="usePlace"/>
      </q-item>
      <q-item>
        <GmapMap style="width: 100%; height: 70vh;" :zoom="10" :center="{lat: 46.5833, lng: 0.3333}">
        <GmapMarker v-for="(marker, index) in markers"
                    :key="index"
                    :position="marker.position"
        />
        <GmapMarker
          v-if="this.place"
          label="★"
          :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"
        />
      </GmapMap>
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
