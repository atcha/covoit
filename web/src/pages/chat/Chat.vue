<template>
  <q-page padding class="row justify-center">
    <q-page style="width: 500px; max-width: 90vw;">
      <div class="q-display-1 q-mb-md text-grey">Chat avec ton co-voiturage</div>
      <q-chat-message
        name="me"
        :text="['Sunday, 19th']"
        stamp="5 minutes ago"
        sent
      />
      <q-chat-message
        :text="['Sunday, 19th']"
        name="Other 1"
        stamp="4 minutes ago"
        receive
      />
      <q-chat-message
        name="me"
        :text="['Sunday, 19th']"
        stamp="1 minutes ago"
        sent
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
