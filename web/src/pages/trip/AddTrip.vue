<template>
  <q-page padding class="trip-add">
    <q-btn class="btn-back" flat icon="arrow_back" @click="$router.go(-1)"/>
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
      <q-item-separator/>
      <q-item v-if="userStore && userStore.user && userStore.user.address && userStore.user.address.label">
        <q-btn color="secondary" @click="launchUserSearch">Utiliser votre adresse de référence :
          {{userStore.user.address.label}}
        </q-btn>
      </q-item>
      <q-item-separator v-show="locationSelected"/>
      <q-item style="display: flex; flex-direction: column; align-items: flex-start;" v-show="locationSelected">
        Nous avons sélectionné la route la plus rapide.
        <div style="margin-top: 15px;" id="map"></div>
      </q-item>
      <q-item-separator v-show="locationSelected"/>
      <q-item v-show="locationSelected">
        <q-datetime
          :value="goTime"
          @change="val => { goTime = val }"
          type="time"
          format24h
          placeholder="Heure aller"
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
          placeholder="Heure retour"
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
  import UsersStore from "../../store/UsersStore";
  import secretMapBox from '../../secret/mapBox';
  import mapboxgl from 'mapbox-gl';

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
        days: [
          'lundi',
          'mardi',
          'mercredi',
          'jeudi',
          'vendredi'
        ],
        userStore: UsersStore,
        address: null,
        pubAccessToken: secretMapBox.publicKey,
        PrivAccessToken: secretMapBox.privateKey,
        map: null,
        mapStyle: 'mapbox://styles/mapbox/streets-v10',
        coordinates: [],
        geoJsonSource: {},
        mapCenter: [0.323584, 46.538796],
        mapZoom: 10,
        validateOpened: false,
      }
    },
    methods: {
      search(terms, done) {
        this.$http.get('/api/geocode/address/' + terms).then(response => {
          done(this.parseAddress(response.body))
        })
      },
      selected(terms) {
        this.location = terms
        this.locationSelected = true
        mapboxgl.accessToken = this.pubAccessToken;
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.mapStyle,
          center: [0.323584, 46.538796],
          zoom: this.mapZoom,
        })
        this.map.resize()
        const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
        const directionsClient = mbxDirections({accessToken: this.PrivAccessToken});
        directionsClient
          .getDirections({
            waypoints: [
              {
                coordinates: this.location.coordinates,
                approach: 'unrestricted',
              },
              {
                coordinates: [0.323584, 46.538796],
                approach: 'unrestricted',
              }
            ],
            alternatives: false,
            overview: 'full',
            geometries: 'geojson',
          })
          .send()
          .then((response) => {
            const directions = response.body;
            console.log(directions);
            directions.routes.forEach((route, index) => {
              this.geoJsonSource = route.geometry;
              const layer = {
                "id": "route"+index,
                "type": "line",
                "source": {
                  "type": "geojson",
                  "data": {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {}
                  }
                },
                "layout": {
                  "line-join": "round",
                  "line-cap": "round",
                },
                "paint": {
                  "line-color": "#0076be",
                  "line-width": 8,
                }
              };

              layer.source.data.geometry = route.geometry;
              this.map.addLayer(layer)
            })
          })
      },
      parseAddress(addresses) {
        return addresses.map((address) => {
          return {
            label: address.properties.label,
            value: address.properties.label,
            coordinates: address.geometry.coordinates,
          }
        })
      },
      toggleDays(day) {
        this.days.push(day);
      },
      launchUserSearch() {
        this.selected(this.userStore.user.address)
        this.terms = this.userStore.user.address.label
      },
      validateRoute() {

        this.validateOpened = true
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../css/pages/trip/addTrip.styl"
</style>
