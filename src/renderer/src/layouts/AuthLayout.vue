<script setup>
import TitleBar from "../components/TitleBar.vue";
import {useElementBounding} from '@vueuse/core'
import {ref} from "vue";

const el = ref(null)
const {height} = useElementBounding(el)

</script>

<template>
  <div class="container grid grid-nogutter surface-ground h-screen justify-content-center">
    <TitleBar
      ref="el"
      class="col-12 "
      hide-logo
      hide-tabs
    />
    <div
      style="width: 100%;"
      :style="`height: calc(100% - ${ height }px)`"
    >
      <div
        class="flex align-items-center justify-content-center h-full overflow-hidden"
      >
        <div class="flex flex-column align-items-center justify-content-center">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
