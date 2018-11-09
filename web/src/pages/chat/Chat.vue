<template>
  <q-page padding class="row justify-center">
    <q-page>
      <h3 class="text-secondary">Chat avec ton co-voiturage</h3>
      <q-chat-message
        name="me"
        :text="['Sunday, 19th']"
        stamp="5 minutes ago"
        :sent="true"
      />
      <q-chat-message
        :text="['Sunday, 19th']"
        name="Other 1"
        stamp="4 minutes ago"
        :sent="false"
      />
      <q-chat-message
        name="me"
        :text="['This is a ','multiples messages testt']"
        stamp="1 minutes ago"
        :sent="true"
      />
    </q-page>
  </q-page>
</template>
<script>
  export default {
    name: 'Chat',
    data() {
      return {}
    }
  };
</script>
<style scoped>
</style>
