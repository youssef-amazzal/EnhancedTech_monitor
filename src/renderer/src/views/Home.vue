<script setup>
import TaskCardSkeleton from "../components/TaskCardSkeleton.vue";


</script>

<template>
  <div
    class="Home-container"
  >
    <div class="flex justify-content-between align-items-center">
      <h2 class="m-0 mb-2 text-color">
        Home
      </h2>
      <DataViewLayoutOptions />
    </div>


    <Suspense>
      <TaskGrid />
      <template #fallback>
        <div class="grid">
          <div
            v-for="task in 12"
            :key="task.id"
            class="col-4 p-1"
          >
            <TaskCardSkeleton
              :task="task"
            />
          </div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>

</style>
