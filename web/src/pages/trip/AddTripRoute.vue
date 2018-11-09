<template>
  <q-page class="trip-add-route">
    <mgl-map
      :accessToken="pubAccessToken"
      :mapStyle.sync="mapStyle"
    />
    <q-list>
      <q-list-header>Sélectionnez votre itinéraire</q-list-header>
      <div v-for="(route, index) in routes.routes">
        <q-item-separator/>
        <q-item>
          <q-item-main>
            <q-item-tile label>{{ route.summary }}</q-item-tile>
            <q-item-tile sublabel>{{ route.legs[0].distance.text }}</q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-icon v-if="index == selectedRouteIndex" color="secondary" name="done" size="1.5rem"/>
            <q-btn v-else outline size="sm" color="primary" @click="highlightRoute(index)">Choisir</q-btn>
          </q-item-side>
        </q-item>
      </div>
      <q-item-separator/>
      <q-item>
        <q-btn
          label="Publier mon trajet"
          color="primary"
          class="full-width no-shadow"
          @click="validateRoute()"
        />
      </q-item>
      <q-modal v-model="validateOpened" content-css="padding: 20px; background: #8bc34a;">
        <div class="row justify-center text-white">
          <h4>
            <q-icon name="fa-thumbs-up" size="l"/>
            Votre trajet est publié
          </h4>
          <p class="text-center">
            Vous serez alerté.e lorsque des passagers seront disponibles.
          </p>
          <q-btn
            color="white"
            outline
            class="full-width no-shadow margin btn-validateroute"
            @click="$router.push({ name: 'home' })"
            label="Très bien !"
          />
        </div>
      </q-modal>
    </q-list>
  </q-page>
</template>

<script>
  import secretMapBox from '../../secret/mapBox'
  import {MglMap} from 'vue-mapbox'

  export default {
    name: "AddTripRoute",
    data() {
      return {
        directionsDisplay: null,
        directionsService: null,
        map: null,
        polylines: [],
        shadows: [],
        routes: [],
        selectedRoute: null,
        selectedRouteIndex: null,
        validateOpened: false,
        pubAccessToken: secretMapBox.publicKey,
        PrivAccessToken: secretMapBox.privateKey,
        mapStyle: 'mapbox://styles/mapbox/streets-v9',
        coordinates: []
      }
    },
    components: {
      MglMap
    },
    mounted() {
      this.coordinates.push(this.$route.params.start[0]);
      this.coordinates.push(this.$route.params.start[1]);
      console.log(this.coordinates);
      const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
      const directionsClient = mbxDirections({accessToken: this.PrivAccessToken});
      directionsClient
        .getDirections({
          waypoints: [
            {
              coordinates: this.coordinates,
              approach: 'unrestricted'
            },
            {
              coordinates: [46.538796, 0.323584],
              approach: 'unrestricted'
            }
          ],
          alternatives: true
        })
        .send()
        .then(response => {
          const directions = response.body;
          console.log(directions);
        });

      // this.directionsService = new this.google.maps.DirectionsService();
      // this.$refs.routeMap.$mapPromise.then((map) => {
      //   this.map = map
      // })
      // this.calcRoute()
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
      mapLoaded(map) {
        map.addLayer({
          'id': 'points',
          'type': 'symbol',
          'source': {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': [{
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-77.03238901390978, 38.913188059745586]
                },
                'properties': {
                  'title': 'Mapbox DC',
                  'icon': 'monument'
                }
              }, {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-122.414, 37.776]
                },
                'properties': {
                  'title': 'Mapbox SF',
                  'icon': 'harbor'
                }
              }]
            }
          }
        })
      },
      mapClicked(map, e) {
        alert('Map Clicked!');
      },
      geolocateError(control, positionError) {
        console.log(positionError);
      },
      geolocate(control, position) {
        console.log(`User position: ${position.coords.latitude}, ${position.coords.longitude}`);
      },
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
              let hide = (index == 0 ? false : true)
              let shadow = this.drawPolylineShadow(route.overview_path, '#79706f')
              let line = this.drawPolyline(route.overview_path, '#0076be', hide)
              if (index === 0) {
                this.selectedRouteIndex = index
                this.selectedRoute = route
              }
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
          if (i === index) {
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
        if (!hide) {
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
        if (!hide) {
          line.setMap(this.map)
        }
        return line
      },
      validateRoute() {
        console.log(this.selectedRoute);
        this.validateOpened = true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../css/pages/trip/addTrip.styl"
</style>
