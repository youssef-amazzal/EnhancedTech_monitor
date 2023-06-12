<script setup>
const {title, description} = defineProps({
  title: String,
  description: String,
})
</script>

<template>
  <div class="flex-column">
    <h1 class="m-0 text-xl">
      {{ title }}
    </h1>
    <p class="font-normal m-0">
      {{ description }}
    </p>
  </div>
</template>

<style scoped>

</style>
