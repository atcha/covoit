<template>
  <q-page>
    <div class="profile-header column justify-center items-center">
        <div class="avatar-container">
          <img src="../assets/avatar.jpeg" height="140" width="140"/>
        </div>
        <h3 class="text-white">Laurent BRUN</h3>
    </div>
    <q-tabs>
      <q-tab default slot="title" label="INFOS" name="tab-infos" />
      <q-tab slot="title" label="COMPTE" name="tab-account" />
      <q-tab-pane name="tab-infos">
        <q-list>
          <q-item>
            <q-item-side>
              <q-icon name="phone_android" />
            </q-item-side>
            <q-item-main>
              <q-item-title sublabel>{{ phone }}</q-item-title>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-side>
              <q-icon name="email" />
            </q-item-side>
            <q-item-main>
              <q-item-title sublabel>{{ email }}</q-item-title>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-side>
              <q-icon name="bookmark" />
            </q-item-side>
            <q-item-main>
              <q-item-title sublabel>{{ address }}</q-item-title>
            </q-item-main>
          </q-item>
        </q-list>
      </q-tab-pane>
      <q-tab-pane name="tab-account">
        <q-list>
          <q-list-header>
            Préférences
          </q-list-header>
          <q-item>
            <q-item-title sublabel>{{ phone }}</q-item-title>
          </q-item>
          <q-item>
            <q-item-title sublabel>{{ email }}</q-item-title>
          </q-item>
          <q-item>
            <q-item-title sublabel>{{ address }}</q-item-title>
          </q-item>
          <q-list-header>
            A propos
          </q-list-header>
          <q-item>
            <q-item-title sublabel>{{ phone }}</q-item-title>
          </q-item>
          <q-item>
            <q-item-title sublabel>{{ email }}</q-item-title>
          </q-item>
          <q-item>
            <q-item-title sublabel>{{ address }}</q-item-title>
          </q-item>
        </q-list>
      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      phone: '06 49 45 56 32',
      email: 'test@test.com',
      address: '32 rue des bateaux 75001 Paris'
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../css/themes/common.variables.styl"
  .profile-header
    background $primary
    padding 15px 0
    img
      border-radius 50%
    h3
      margin 15px 0
  .q-tab-pane
    border none
</style>
