<script setup>
import { useTheme } from "../composables/Theme";
const { toggleTheme } = useTheme();
</script>

<template>
  <Card style="width: 25em">
    <template #title> Advanced Card </template>
    <template #subtitle> Card subtitle </template>
    <template #content>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
        quas!
      </p>
    </template>
    <template #footer>
      <Button icon="pi pi-check" label="Save" />
      <Button
        label="Cancel"
        severity="secondary"
        icon="pi pi-times"
        style="margin-left: 0.5em"
        @click="toggleTheme"
      />
    </template>
  </Card>
</template>

<style scoped lang="scss">
</style>
