<script setup>
import TitleBar from "../components/TitleBar.vue";
import {ref} from 'vue'
import {useElementBounding} from '@vueuse/core'

const el = ref(null)
const {height} = useElementBounding(el)
</script>

<template>
  <div class="container grid grid-nogutter surface-ground h-screen justify-content-center">
    <TitleBar
      ref="el"
      class="col-12 "
    />
    <ScrollPanel
      style="width: 100%;"
      :style="`height: calc(100% - ${ height }px)`"
      class="custombar1 content-container"
    >
      <router-view
        class="h-full pt-5 px-8 sm:align-self-center"
      />
    </ScrollPanel>
  </div>
</template>

<style>
.content-container {
  max-width: 1100px;
}
</style>
