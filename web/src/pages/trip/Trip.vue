<template>
  <q-page padding class="trip-list">
    <h3 class="text-secondary">Vos trajets</h3>
    <q-list highlight inset-separator class="ride-list">
      <q-list-header>Lundi 7 mai</q-list-header>
      <q-item-separator/>
      <q-item>
        <q-item-side>
          <q-item-tile>
            08:00
          </q-item-tile>
        </q-item-side>
        <q-item-main
          label="Domicile -> Travail"
          label-lines="1"
          sublabel="En attente de passagers"
          sublabel-lines="1"
        />
        <q-item-side right>
          <q-item-tile icon="fa-ellipsis-v" />
        </q-item-side>
      </q-item>
      <q-item-separator/>
      <q-item>
        <q-item-side>
          <q-item-tile>
            18:00
          </q-item-tile>
        </q-item-side>
        <q-item-main
          label="Travail -> Domicile"
          label-lines="1"
          sublabel="En attente de passagers"
          sublabel-lines="1"
        />
        <q-item-side right>
          <q-item-tile icon="fa-ellipsis-v" />
        </q-item-side>
      </q-item>
      <q-item-separator/>
    </q-list>
    <q-list inset-separator class="q-mt-md ride-list">
      <q-list-header>Mardi 8 mai</q-list-header>
      <q-item-separator/>
      <q-item>
        <q-item-side>
          <q-item-tile>
            08:00
          </q-item-tile>
        </q-item-side>
        <q-item-main
          label="Domicile -> Travail"
          label-lines="1"
          sublabel="En attente de passagers"
          sublabel-lines="1"
        />
        <q-item-side right>
          <q-item-tile icon="fa-ellipsis-v" />
        </q-item-side>
      </q-item>
      <q-item-separator/>
      <q-item>
        <q-item-side>
          <q-item-tile>
            18:00
          </q-item-tile>
        </q-item-side>
        <q-item-main
          label="Travail -> Domicile"
          label-lines="1"
          sublabel="En attente de passagers"
          sublabel-lines="1"
        />
        <q-item-side right>
          <q-item-tile icon="fa-ellipsis-v" />
        </q-item-side>
      </q-item>
      <q-item-separator/>
    </q-list>
    <q-btn
      round
      color="primary"
      @click="$router.push('/proposer/ajout')"
      class="fixed"
      icon="add"
      style="right: 10px; bottom: 70px"
    />
  </q-page>
</template>

<script>
  export default {
    name: 'Trip',
    data() {
      return {
      }
    },
    methods: {}
  }
</script>

<style>
</style>


