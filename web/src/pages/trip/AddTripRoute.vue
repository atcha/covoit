<template>
  <q-page class="trip-add-route">
    <GmapMap ref="routeMap" style="width: 100%; height: 30vh;" :zoom="10" :center="{lat: 46.5833, lng: 0.3333}">
    </GmapMap>
    <q-list>
      <q-list-header>Sélectionnez votre itinéraire</q-list-header>
      <div v-for="(route, index) in routes.routes">
        <q-item-separator />
        <q-item>
          <q-item-main>
            <q-item-tile label>{{ route.summary }}</q-item-tile>
            <q-item-tile sublabel>{{ route.legs[0].distance.text }}</q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-icon v-if="index == selectedRouteIndex" color="secondary" name="done" size="1.5rem" />
            <q-btn v-else outline size="sm" color="primary" @click="highlightRoute(index)">Choisir</q-btn>
          </q-item-side>
        </q-item>
      </div>
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
            map: null,
            polylines: [],
            shadows: [],
            routes: [],
            selectedRoute: null,
            selectedRouteIndex: null
          }
        },
        computed: {
          google: gmapApi
        },
        mounted() {
          this.directionsService = new this.google.maps.DirectionsService();
          this.$refs.routeMap.$mapPromise.then((map) => {
            this.map = map
          })
          this.calcRoute()
        },
        created() {
          // récupérer les données lorsque la vue est créée et
          // que les données sont déjà observées
        },
        watch: {
          // appeler encore la méthode si la route change
          '$route': 'calcRoute'
        },
        methods: {
          calcRoute() {
            let start = this.$route.params.start
            let end = "Bois de Fief Clairet, 86240 Ligugé"
            let request = {
              origin: start,
              destination: end,
              provideRouteAlternatives: true,
              travelMode: 'DRIVING'
            };
            this.directionsService.route(request, (result, status) => {
              if (status === 'OK') {
                this.routes = result
                result.routes.forEach((route, index) => {
                  // let's make the first suggestion highlighted;
                  let hide = (index==0 ? false : true)
                  let shadow = this.drawPolylineShadow(route.overview_path, '#666666')
                  let line = this.drawPolyline(route.overview_path, '#0000ff', hide)
                  if(index === 0) {
                    this.selectedRouteIndex = index
                    this.selectedRoute = route
                  }
                  console.log(this.selectedRoute)
                  this.polylines.push(line)
                  this.shadows.push(shadow)
                  this.google.maps.event.addListener(shadow, 'click', (e) => {
                    // detect which route was clicked on
                    let index = this.shadows.indexOf(shadow)
                    this.highlightRoute(index)
                  })
                })
              } else {
                console.log("Unable to retrieve your route")
              }
            })
          },
          highlightRoute(index) {
            this.selectedRouteIndex = index
            this.selectedRoute = this.routes[index]
            this.polylines.forEach((polyline, i) => {
              if(i === index) {
                polyline.setMap(this.map)
              } else {
                polyline.setMap(null)
              }
            })
          },
          drawPolyline(path, color, hide) {
            let line = new this.google.maps.Polyline({
              path: path,
              strokeColor: color,
              strokeOpacity: 1,
              strokeWeight: 5,
              zIndex: 10
            })
            if(!hide) {
              line.setMap(this.map)
            }
            return line
          },
          drawPolylineShadow(path, color, hide) {
            let line = new this.google.maps.Polyline({
              path: path,
              strokeColor: color,
              strokeOpacity: 0.8,
              strokeWeight: 5,
              zIndex: 1
            })
            if(!hide) {
              line.setMap(this.map)
            }
            return line
          }
        }
    }
</script>

<style scoped>

</style>
