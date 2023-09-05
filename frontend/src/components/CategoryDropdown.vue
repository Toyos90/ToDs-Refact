<script setup>
import { onUpdated, ref } from 'vue';

const category = ref('')
let emit = defineEmits(['category'])

onUpdated(() => {
  emit('category', category.value)
})

</script>

<template>
    <div class="dropdown">
        <select v-model="category"
          class="select-dropdown">
          
          <option value="Casa">Casa</option>
          <option value="Trabajo">Trabajo</option>
          <option value="Ocio">Ocio</option>
          <option value="Compras">Compras</option>
          </select
        >
      </div>
</template>

<style scoped>
.select-dropdown{
  width: 10rem;
  height: 2rem;
}

</style>
