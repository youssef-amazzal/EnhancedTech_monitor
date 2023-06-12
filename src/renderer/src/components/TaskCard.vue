<script setup>
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import {useRouter} from "vue-router";
import {useAppStore} from "../stores/AppStore";
import {STATUS} from "../assets/js/Enums";

const {t} = useI18n();
const router = useRouter();
const appStore = useAppStore();

const {task} = defineProps({
  task: {
    type: Object,
    required: true,
  }
})

const {folder: {year, type, office}, sequence} = task.part;
const totalPages = task.pages_number;
const finishedPages = task.completed_number;


const title = computed(() => {
  return t('home.task.titleTemplate', {
    type: t(`home.types.${type.abbrev}`, totalPages),
    year,
    sequence,
  })
})

const progress = computed(() => {
  return Math.round((finishedPages / totalPages) * 100);
})


const toTask = () => {
  appStore.data.setActiveTask(JSON.stringify(task));
  router.push({
    name: 'task',
    params: {id: task.id}
  })
}


</script>

<template>
  <Card
    class="shadow-none border-2 surface-border h-full p-2 cursor-pointer select-none hover:surface-hover"
    @click="toTask"
  >
    <template #header>
      <div class="flex justify-content-between align-items-center">
        <Tag :class="STATUS[task.status].class">
          {{ STATUS[task.status].text.value }}
        </Tag>
        <Button
          class="p-1 max-w-fit border-circle bg-transparent hover:bg-gray-100 border-none "
          size="small"
        >
          <template #icon>
            <mdi-dots-vertical class="text-xl text-gray-600 hover:text-white" />
          </template>
        </Button>
      </div>
    </template>

    <template #title>
      <h1 class="text-sm font-normal text-color mb-0">
        {{ title }}
      </h1>
      <h2 class="text-xs font-normal m-0">
        {{ t('home.task.office', {office: office.office_num}) }}
      </h2>
    </template>

    <template #footer>
      <Divider class="my-2" />
      <div class="flex gap-2 align-items-center">
        <carbon-task class="text-sm" />
        <span class="text-xs">{{ finishedPages + '/' + totalPages }}</span>
        <ProgressBar
          :value="progress"
          :show-value="false"
          class="w-full text-xs"
          style="height: 7px;"
        />
        <span class="text-xs">{{ progress + '%' }}</span>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.p-card-body {
  min-height: 100% !important;
}
</style>
