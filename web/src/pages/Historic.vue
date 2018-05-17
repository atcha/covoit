<template>
  <q-page padding>
    <q-list>
      <q-list-header>
        Avec qui avez-vous covoituré ?
      </q-list-header>
      <q-item-separator />
      <q-item>
        <q-item-side>
          <q-item-tile label>Covoitureur</q-item-tile>
        </q-item-side>
        <q-item-main>
        </q-item-main>
        <q-item-side right>
          <q-item-tile label>Nb Trajet</q-item-tile>
        </q-item-side>
      </q-item>
      <q-item-separator />
      <q-item>
        <q-item-side>
          <q-icon name="face" />
        </q-item-side>
        <q-item-main>
          <q-item-tile label>Thibaud Larmache</q-item-tile>
          <q-item-tile sublabel>Opel Zafira</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-chip color="secondary">
            50
          </q-chip>
        </q-item-side>
      </q-item>
      <q-item-separator />
      <q-item>
        <q-item-side>
          <q-icon name="face" />
        </q-item-side>
        <q-item-main>
          <q-item-tile label>John Doe</q-item-tile>
          <q-item-tile sublabel>Renault clio 3</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-chip color="secondary">
            5
          </q-chip>
        </q-item-side>
      </q-item>
      <q-item-separator />
      <q-item>
        <q-item-side>
          <q-icon name="face" />
        </q-item-side>
        <q-item-main>
          <q-item-tile label>John Doe</q-item-tile>
          <q-item-tile sublabel>BMW Z3</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-chip color="secondary">
            5
          </q-chip>
        </q-item-side>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'Historic',
}
</script>

<style>
</style>
