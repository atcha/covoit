<template>
  <q-page class="trip-add-route">
    <GmapMap style="width: 100%; height: 30vh;" :zoom="10" :center="{lat: 46.5833, lng: 0.3333}">
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
    <q-list>
      <q-list-header>Sélectionnez votre itinéraire</q-list-header>
      <q-item>

      </q-item>
    </q-list>
  </q-page>
</template>

<script>
    export default {
        name: "AddTripRoute",
        data() {
          return {
            directionsDisplay: null,
            directionsService: new google.maps.DirectionsService(),
            map: null
          }
        },
        methods: {
          mounted() {
            this.directionsDisplay = new google.maps.DirectionsRenderer();
            var poitiers = new google.maps.LatLng(46.5833, 0.3333);
            var mapOptions = {
              zoom:7,
              center: poitiers
            }
            this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            this.directionsDisplay.setMap(map);
          },
          calcRoute() {
            var start = document.getElementById('start').value;
            var end = document.getElementById('end').value;
            var request = {
              origin: start,
              destination: end,
              travelMode: 'DRIVING'
            };
            directionsService.route(request, function(result, status) {
              if (status == 'OK') {
                directionsDisplay.setDirections(result);
              }
            });
          }
        }
    }
</script>

<style scoped>

</style>
