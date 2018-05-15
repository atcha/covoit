<template>
  <q-page class="trip-add-route">
    <GmapMap ref="routeMap" style="width: 100%; height: 30vh;" :zoom="10" :center="{lat: 46.5833, lng: 0.3333}">
      <DirectionsRenderer />
    </GmapMap>
    <q-list>
      <q-list-header>Sélectionnez votre itinéraire</q-list-header>
      <q-item>

      </q-item>
    </q-list>
  </q-page>
</template>

<script>
    import { gmapApi } from 'vue2-google-maps'

    export default {
        name: "AddTripRoute",
        components: {
        },
        data() {
          return {
            directionsDisplay: null,
            directionsService: null,
            map: null
          }
        },
        computed: {
          google: gmapApi
        },
        created() {
          // récupérer les données lorsque la vue est créée et
          // que les données sont déjà observées
          this.directionsService = this.google.maps.DirectionsService();
          this.directionsDisplay = this.google.maps.DirectionsRenderer();
          this.$refs.routeMap.$mapPromise.then((map) => {
            console.log(map);
            this.directionsDisplay.setMap(map);
          })
          this.calcRoute()
        },
        watch: {
          // appeler encore la méthode si la route change
          '$route': 'calcRoute'
        },
        methods: {
          calcRoute() {
            // console.log(this.$route.params);
            var start = this.$route.params.start;
            var end = "Bois de Fief Clairet, 86240 Ligugé";
            var request = {
              origin: start,
              destination: end,
              travelMode: 'DRIVING'
            };
            // console.log(request);
            this.directionsService.route(request, function(result, status) {
              if (status === 'OK') {
                this.directionsDisplay.setDirections(result);
              }
            });
          }
        }
    }
</script>

<style scoped>

</style>
