<template>
  <div class="home">
      <img src="../assets/mess.png" alt="" height="100" width="100">
  <WhatsApp/>
  </div>
  

</template>

<script>
// @ is an alias to /src
import WhatsApp from '@/components/WhatsApp.vue'

export default {
  name: 'Home',
  components: {
    WhatsApp
  }
}
</script>


<style scoped>

</style>