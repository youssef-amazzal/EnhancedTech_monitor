<script setup>
import MainLayout from "./layouts/MainLayout.vue";
import { useTheme } from "./composables/Theme";

const { initializeTheme } = useTheme();
initializeTheme();

</script>

<template>
  <MainLayout />
</template>

<style lang="scss">
</style>
