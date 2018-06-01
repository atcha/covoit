<template>
  <q-page>
    <div class="profile-header column justify-center items-center">
      <div class="avatar-container">
        <img src="../assets/avatar.jpeg" height="140" width="140"/>
      </div>
      <h3 class="text-white">{{this.user.displayName}}</h3>
    </div>
    <q-tabs>
      <q-tab default slot="title" label="INFOS" name="tab-infos"/>
      <q-tab slot="title" label="COMPTE" name="tab-account"/>
      <q-tab-pane name="tab-infos">
        <q-list>
          <q-list-header>
            Contact
          </q-list-header>
          <q-item>
            <q-item-side>
              <q-icon name="phone_android"/>
            </q-item-side>
            <q-item-main>
              <q-item-tile sublabel>{{ user.phone }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-side>
              <q-icon name="email"/>
            </q-item-side>
            <q-item-main>
              <q-item-tile sublabel>{{ user.email }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-side>
              <q-icon name="bookmark"/>
            </q-item-side>
            <q-item-main>
              <q-item-tile sublabel v-if="user.address">{{ user.address.label }}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-btn
                color="secondary"
                label="Modifier"
                icon="bookmark"
                @click="enterContacts"
              />
              <q-modal v-model="openedContacts"
                       :content-css="{minWidth: '60vw', minHeight: '60vh', padding:'1em'}">
                <q-list>
                  <q-list-header>
                    Vos coordonnées
                  </q-list-header>
                  <q-item-separator/>
                  <q-item>
                    <q-item-side>
                      <q-icon name="account_box"/>
                    </q-item-side>
                    <q-item-main>
                      <q-item-tile sublabel>
                        <q-input v-model="tempUser.displayName"/>
                      </q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item>
                    <q-item-side>
                      <q-icon name="phone_android"/>
                    </q-item-side>
                    <q-item-main>
                      <q-item-tile sublabel>
                        <q-input v-model="tempUser.phone"/>
                      </q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item>
                    <q-item-side>
                      <q-icon name="email"/>
                    </q-item-side>
                    <q-item-main>
                      <q-item-tile sublabel>
                        <q-input type="email" v-model="tempUser.email"/>
                      </q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item>
                    <q-item-side>
                      <q-icon name="bookmark"/>
                    </q-item-side>
                    <q-item-main>
                      <q-item-tile sublabel>
                        <!--<q-input v-model="address"/>-->
                        <!-- Adds a separator between results -->
                        <q-search v-model="terms" class="full-width">
                          <q-autocomplete
                            separator
                            @search="search"
                            @selected="selected"
                          />
                        </q-search>
                      </q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item-separator/>
                  <q-item>
                    <q-item-main>
                      <q-item-side right>
                        <q-btn
                          color="primary"
                          @click="annuler"
                          label="Annuler"
                        />
                        <q-btn
                          color="secondary"
                          @click="sauvegarder"
                          label="Sauvegarder"
                        />
                      </q-item-side>
                    </q-item-main>
                  </q-item>
                </q-list>

              </q-modal>
            </q-item-side>
          </q-item>
          <q-item-separator/>
          <q-list-header>
            Véhicule
          </q-list-header>
          <q-item>
            <q-item-main>
              <q-item-tile v-if="car" sublabel>{{ car }}</q-item-tile>
            </q-item-main>
            <q-item-side v-if="car" right>
              <q-btn v-if="car"
                     color="secondary"
                     label="Modifier"
                     icon="directions_car"
                     @click="enterCar"
              />
            </q-item-side>
            <q-item-main v-else>
              <q-btn
                color="secondary"
                label="Ajouter un véhicule"
                icon="directions_car"
                @click="enterCar"
              />
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
            <q-item-main>
              <q-item-tile sublabel>Mot de passe</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-btn flat round dense icon="more_vert">
                <q-popover>
                  <q-list link>
                    <q-item v-close-overlay>
                      <q-item-main label="Modifier"/>
                    </q-item>
                    <q-item v-close-overlay>
                      <q-item-main label="Forward"/>
                    </q-item>
                    <q-item v-close-overlay>
                      <q-item-main label="Delete"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </q-item-side>
          </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile sublabel>Adresse postale</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-btn flat round dense icon="more_vert">
                <q-popover>
                  <q-list link>
                    <q-item v-close-overlay>
                      <q-item-main label="Ajouter"/>
                    </q-item>
                    <q-item v-close-overlay>
                      <q-item-main label="Modifier"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </q-item-side>
          </q-item>
          <q-item-separator/>
          <q-list-header>
            A propos
          </q-list-header>
          <q-item>
            <q-item-tile sublabel>Aide</q-item-tile>
          </q-item>
          <q-item>
            <q-item-tile sublabel>Conditions générales</q-item-tile>
          </q-item>
        </q-list>
      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<script>

  export default {
    name: 'Profile',
    components: {},
    data() {
      return {
        user : {
          phone: '06 49 45 56 32',
          email: 'test@test.com',
          address: {
            label :'32 rue des bateaux 75001 Paris'
          },
        },
        terms : null,
        tempUser : {},
        car: '',
        openedContacts: false,
      }
    },
    methods: {
      enterCar() {
        this.$q.dialog({
          title: 'Votre véhicule',
          color: 'primary',
          ok: 'Valider',
          cancel: 'Annuler',
          prompt: {
            model: this.car,
            type: 'text' // optional
          }
        }).then(data => {
          this.car = data
        })
      },
      enterContacts() {
        this.openedContacts = true;
        this.tempUser = {...this.user};
        this.terms = this.user.address.label;
      },
      search (terms, done) {
        this.$http.get('/api/geocode/address/' + terms).then(response => {
          done(this.parseAddress(response.body))
        })
      },
      selected (terms) {
        this.tempUser.address = terms;
      },
      parseAddress(addresses) {
        return addresses.map(address => {
          return {
            label: address.properties.label,
            value: address.properties.label,
            coordinates: address.geometry.coordinates
          }
        })
      },
      annuler(){
        this.openedContacts = false;
      },
      sauvegarder(){
        this.openedContacts = false;
        this.user = {...this.tempUser};
        this.$http.put('/api/users', this.user);
      }
    },
    mounted(){
      this.$http.get('/api/users/current').then((user) => this.user = user.body);
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../css/pages/profile.styl"
</style>
