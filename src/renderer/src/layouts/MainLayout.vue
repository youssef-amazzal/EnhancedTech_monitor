<script setup>
import TitleBar from "../components/TitleBar.vue";
import {ref} from 'vue'
import {useElementBounding} from '@vueuse/core'
import {useAppStore} from "../stores/AppStore";

const el = ref(null)
const {height} = useElementBounding(el);
const {ui} = useAppStore();
</script>

<template>
  <div
    class="flex flex-column surface-ground h-screen justify-content-start align-items-center min-h-screen pb-5"
  >
    <TitleBar
      ref="el"
      class="col-12 h-3rem"
    />
    <router-view
      style="width: 100%;"
      :style="`min-height: calc(100% - ${ height }px)`"
      class="content-container pt-5 px-8"
    />
  </div>
</template>

<style>
.content-container {
  max-width: 1200px;
}
</style>
