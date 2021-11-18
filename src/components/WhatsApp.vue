<template>
  <div class="WhatsApp">
    <button type="button" class="btn btn-primary btn-lg" @click="initWhatsapp">Iniciar</button>
  </div>
</template>

<script>
import { init } from '../whatsapp/whatsappClient'


export default {
  name: 'WhatsApp',
  methods: {
    initWhatsapp() {
       init()
    }
  }
}


</script>

<style scoped>

.WhatsApp {
  margin-top: 30px;
}

</style>