<script setup>
import {useAuth} from "../composables/useAuth";
import {ref} from "vue";
import {supabase} from "../assets/js/Supabase";
import {useTasks} from "../composables/cache/useTask";

const {getUser} = useAuth();

const {user} = await getUser();

const {getTasks} = useTasks();
const tasks = await getTasks();


</script>

<template>
  <div class="grid">
    <!--      Task cards       -->
    <div
      v-for="task in tasks"
      :key="task.id"
      class="col-4 p-1"
    >
      <TaskCard
        :task="task"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
