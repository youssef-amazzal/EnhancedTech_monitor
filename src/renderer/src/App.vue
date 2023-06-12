<script setup>
import Toast from 'primevue/toast';
</script>

<template>
  <div
    id="app"
    class="surface-ground min-h-screen h-fit"
  >
    <Toast class="mt-5" />
    <router-view />
  </div>
</template>

<style>
/* override PrimeVue styles */
.p-card-body, .p-card-content {
  padding: 0 !important;
}
</style>
