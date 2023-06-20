<script setup>
import {computed, defineProps, ref, watch} from 'vue';
import {ACTIONS} from "../assets/js/Enums";
import {useImage, whenever} from "@vueuse/core";
import {useAppStore} from "../stores/AppStore";
import {storeToRefs} from "pinia";

const props = defineProps({
  pages: {
    type: Array,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:visible', 'update:activeIndex'])

// Create a computed property to simplify two-way binding
const visible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  }
})

const activeIndex = computed({
  get() {
    return props.activeIndex
  },
  set(value) {
    emit('update:activeIndex', value)
  }
})


// workarounds for image paths
const getPath = (path) => {
  const prefix = 'https://ccpavmeycgczphxolyol.supabase.co/storage/v1/object/public/images/';
  return path.startsWith('http') ? path : prefix + path;
}

const loading = ref(false);
const loadImage = (imagePath) => {
  loading.value = true;
  const {isLoading} = useImage(getPath(imagePath));
  whenever(() => !isLoading.value, () => {
    loading.value = false;
  });
}

const {activeIndex: activePage} = storeToRefs(useAppStore());
watch(activePage, (newVal) => {
  loadImage(props.pages[newVal].image_path);
})

</script>

<template>
  <Galleria
    v-model:visible="visible"
    v-model:activeIndex="activeIndex"
    :value="props.pages"
    :full-screen="true"
    :show-item-navigators="true"
    :show-thumbnails="false"
  >
    <template #item="slotProps">
      <div>
        <Image
          :alt="slotProps.item.name"
          preview
        >
          <template #image>
            <Skeleton
              v-if="loading"
              class="surface-ground"
              style="height: 85vh; width: 50vw;"
            />
            <img
              v-else
              :src="getPath(slotProps.item.image_path)"
              style="max-width: calc(100vw * 0.75); max-height: calc(100vh * 0.90);"
            >
          </template>
          <template #preview="preview = slotProps">
            <img
              :src="getPath(slotProps.item.image_path)"
              :style="preview.style"
              style="max-width: calc(100vw * 0.75); max-height: calc(100vh * 0.90)"
            >
          </template>
        </Image>
      </div>
    </template>

    <template #caption="slotProps">
      <div class="flex justify-content-between">
        <div class="flex gap-3 bg-black-alpha-90 opacity-100">
          <div class="text-xl font-bold">
            {{ slotProps.item.name }}
          </div>
          <tag
            :class="ACTIONS[slotProps.item.isDeleted ? 'deleted' : slotProps.item.activities[0].type].class"
          >
            {{ ACTIONS[slotProps.item.isDeleted ? 'deleted' : slotProps.item.activities[0].type].text() }}
          </tag>
        </div>
        <div>
          {{ `${activePage + 1}/${props.pages.length}` }}
        </div>
      </div>
    </template>
  </Galleria>
</template>

<style>

.p-galleria {
  min-width: 100vw;
  min-height: 100vh;
}

.p-galleria-content > .p-galleria-item-wrapper {

  z-index: -1;
  position: relative;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: center;
}

.p-galleria-content > .p-galleria-thumbnail-wrapper {
  flex-grow: 0;
  flex-shrink: 1;
}

.p-galleria-item {
  min-height: 100vh;
}

.p-galleria-content {
  position: relative;
  z-index: -2;
}

.p-image-toolbar {
  z-index: 1;
}
</style>
