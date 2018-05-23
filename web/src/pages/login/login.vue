<template>
  <div class="row justify-center items-center" style="min-height: calc(100vh - 50px);">
    <div class="form-login col-10 col-md-3">
      <q-card class="text-center">
        <q-card-title class="bg-primary">
          <!--<img src="../../assets/logo.svg" width="128" height="128" />-->
          <h4 class="text-white">Connectez-vous</h4>
        </q-card-title>
        <q-card-separator/>
        <q-card-main class="bg-white">
          <q-field error-label="Un e-mail valide est requis" class="text-left">
            <q-input
              float-label="e-mail"
              v-model="email" />
          </q-field>
          <q-field error-label="Le mot de passe est obligatoire" class="text-left">
            <q-input
              type="password"
              float-label="Mot de passe"
              max-length="16"
              v-model="password"
              @keyup.enter="login" />
          </q-field>
        </q-card-main>
        <q-card-separator/>
        <q-card-actions class="bg-grey-11 inline-block vertical-middle">
          <!--<q-btn color="secondary" class="full-width" style="margin-top: 15px;">Connexion</q-btn>-->
          <q-btn color="google" icon="fab fa-google" label="Connexion" to="/google/login" class="full-width" style="margin-top: 15px;" />
          <q-btn color="facebook" icon="fab fa-facebook" label="Connexion" to="/facebook/login" class="full-width" style="margin-top: 15px;" />
          <p style="margin-top: 15px;">Pas de compte ? <router-link to="/sign-up">Créez le maintenant.</router-link></p>

        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        console.log('classical login')
      }
    }
  }
</script>

<style>
</style>
