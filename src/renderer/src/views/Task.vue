<script setup>
import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useElementBounding, whenever} from "@vueuse/core";
import {useAppStore} from "../stores/AppStore";
import {useDocs} from "../composables/cache/useDocs";
import {HEADERS, STATUS} from "../assets/js/Enums";
import {formatDistanceToNow} from "date-fns";
import ImageViewer from "../components/ImageViewer.vue";
import {useSettingsStore} from "../stores/SettingsStore";
import {useSettings} from "../composables/useSettings";
import {storeToRefs} from "pinia";

// utilities
const {t} = useI18n();
const router = useRouter();
const appStore = useAppStore();
const SettingsStore = useSettingsStore();
const lang = SettingsStore.lang;

const {data} = appStore;
const task = data.activeTask;
const {part: {folder: {year, type}, sequence}} = task;

const title = computed(() => {
  return t('home.task.titleTemplate', {
    type: t(`home.types.${type?.abbrev}`, task?.pages_number),
    year: year,
    sequence: sequence, // sequence
  })
})

// states
const isLoading = ref(false);
const selectedDocument = ref(null);
const expandedRows = ref([]);
const displayBasic = ref(false);
const {activeIndex} = storeToRefs(appStore);
const container = ref(null);
const H_CONTAINER = useElementBounding(container).height;

// fetch data
const cache = useDocs();
const {localDocuments: documents, localPages: pages} = cache;
const {countDirtyPages, saveChanges} = cache;

// functions
const docToIndex = () => {
  return pages.value.findIndex(page => page.id_document === selectedDocument.value.id)
}

const pageToIndex = (page) => {
  return pages.value.findIndex(p => p.id === page.id)
}
const openPage = (pageIndex) => {
  displayBasic.value = true;
  activeIndex.value = pageIndex;
}

const save = async () => {
  isLoading.value = true;
  const {isReady_1, isReady_2} = await saveChanges();
  whenever(() => isReady_1.value && isReady_2.value, () => {
    isLoading.value = false;
  })
}

//hotkeys
const {listenToShortcuts} = useSettings();
listenToShortcuts({active: displayBasic, data: pages, index: activeIndex});
</script>

<template>
  <div
    ref="container"
    class="flex flex-column gap-3"
  >
    <Toolbar
      ref="toolbar"
      class="p-2"
    >
      <template #start>
        <div class="flex align-items-center gap-2">
          <Button
            class="p-1 max-w-fit"
            text
            @click="router.go(-1)"
          >
            <template #icon>
              <mdi-arrow-left class="text-lg" />
            </template>
          </Button>
          <h2 class="m-0 text-lg text-color">
            {{ title }}
          </h2>
        </div>
      </template>
      <template #end>
        <div class="flex align-items-center gap-2">
          <Button
            label="Save"
            icon="pi pi-save"
            severity="success"
            :badge="countDirtyPages"
            :loading="isLoading"
            @click="save"
          />
        </div>
      </template>
    </Toolbar>

    <DataTable
      v-model:selection="selectedDocument"
      v-model:expandedRows="expandedRows"
      data-key="id"

      :value="documents"
      class="border-2 surface-card surface-border border-round p-datatable-sm"
      :style="`height: ${ H_CONTAINER - 150 }px`"

      striped-rows
      row-hover
      :row-class="() => ['cursor-pointer', 'select-none']"

      scrollable
      scroll-height="flex"

      selection-mode="single"
      @row-dblclick="openPage(docToIndex())"
    >
      <Column
        expander
        style="width: 1rem"
      />
      <Column
        field="name"
        :header="HEADERS.title.text()"
        :style="HEADERS.title.style"
      >
        <template #body="slotProps">
          <span class="font-semibold text-xs">
            {{ slotProps.data.name }}
          </span>
        </template>
      </Column>
      <Column
        field="sequence"
        :header="HEADERS.sequence.text()"
        :style="HEADERS.sequence.style"
      >
        <template #body="slotProps">
          <span>{{ slotProps.data.sequence }}</span>
        </template>
      </Column>
      <Column
        field="created_at"
        :header="HEADERS.created_at.text()"
      >
        <template #body="slotProps">
          <span>
            {{
              formatDistanceToNow(new Date(slotProps.data.created_at), {locale: lang.get.dateFormat, addSuffix: true})
            }}
          </span>
        </template>
      </Column>
      <Column
        :header="HEADERS.status.text()"
      >
        <template #body="slotProps">
          <Tag :class="STATUS[slotProps.data.status].class">
            {{ STATUS[slotProps.data.status].text.value }}
          </Tag>
        </template>
      </Column>

      <template #expansion="slotProps">
        <div
          v-for="page in slotProps.data.pages"
          :key="page.id"
          class="page-row flex surface-ground py-1 -m-2 align-items-center hover:surface-hover cursor-pointer"
          @click="openPage(pageToIndex(page))"
        >
          <div style="width: 48px" />
          <div
            class="text-xs"
            :style="HEADERS.title.style"
          >
            {{ page.name }}
          </div>
          <div
            :style="HEADERS.sequence.style"
          >
            {{ page.sequence }}
          </div>
          <div
            :style="HEADERS.created_at.style"
          />
          <div
            class="pl-5"
            :style="HEADERS.status.style"
          >
            <Button
              class="p-0 m-0"
              text
              :severity="STATUS[page.status].severity"
            >
              <component :is="STATUS[page.status].icon" />
            </Button>
          </div>
        </div>
      </template>
    </DataTable>

    <ImageViewer
      v-model:visible="displayBasic"
      v-model:activeIndex="activeIndex"
      :pages="pages"
    />
  </div>
</template>

<style scoped>
:deep(td) {
  border: none !important;
  font-size: 0.8rem !important;
}

#fullDiv {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  position: fixed;
}

.page-row > div {
  padding: 8px;
}
</style>
