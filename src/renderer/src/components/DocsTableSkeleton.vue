<script setup>
import {HEADERS} from "../assets/js/Enums";

const {height} = defineProps({
  height: {
    type: Number,
    required: true,
  }
})

const documents = Array(20);
</script>

<template>
  <DataTable
    data-key="id"

    :value="documents"
    class="border-2 surface-border border-round p-datatable-sm"
    :style="`height: ${ height }px`"

    scrollable
    scroll-height="flex"
  >
    <Column
      v-for="({text, style}, index) in Object.entries(HEADERS)"
      :key="index"
      :header="text"
      :style="style"
    >
      <template #body>
        <Skeleton />
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>

</style>
