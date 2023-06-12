<script setup>
import {useI18n} from 'vue-i18n'
import {ref} from 'vue'
import {useAppStore} from '../stores/AppStore'
import {useSettingsStore} from '../stores/SettingsStore'


const {hideTabs, hideLogo} = defineProps({
  hideTabs: {
    type: Boolean,
    default: false
  },
  hideLogo: {
    type: Boolean,
    default: false
  }
})

const {t} = useI18n()

const {view} = useAppStore()
const {lang, theme} = useSettingsStore()

const items = ref([
  {
    id: view.available.Home,
    label: 'titleBar.Home',
    icon: 'pi pi-fw pi-home',
    to: '/home'
  },
  {
    id: view.available.Profile,
    label: 'titleBar.Profile',
    icon: 'pi pi-fw pi-user',
    to: '/profile'
  },
  {
    id: view.available.Settings,
    label: 'titleBar.Settings',
    icon: 'pi pi-fw pi-cog',
    to: '/settings'
  }
])

// const buttons = [
//   {
//     id: 0,
//     icon: IconMinimize,
//     class: 'hover:bg-green-500',
//     click: () => {
//       lang.toggle()
//     }
//   },
//   {
//     id: 1,
//     icon: IconRestore,
//     class: 'hover:bg-yellow-500',
//     click: () => {
//       theme.toggle()
//     }
//   },
//   {
//     id: 2,
//     icon: IconClose,
//     class: 'hover:bg-red-500',
//     click: () => {
//       console.log('close')
//     }
//   }
// ]

</script>

<template>
  <Toolbar class="bg-transparent border-none align-items-start">
    <template #start>
      <img
        v-if="!hideLogo"
        :src="theme.logo"
        class="m-2"
        style="height: 2.3rem"
      >
    </template>

    <template #center>
      <div
        v-if="!hideTabs"
        class="flex"
      >
        <router-link
          v-for="item in items"
          :key="item.label"
          class="py-2 px-4 m-2 text-color no-underline hover:text-900 focus:bg-primary border-round"
          :class="{ 'bg-primary': view.current === item.id }"
          :to="item.to"
          @click="view.set(item.id)"
        >
          <i
            :class="[item.icon, { 'text-white': view.current === item.id }]"
          />
          <span
            class="p-button-label"
            :class="{ 'text-white': view.current === item.id }"
          >{{ t(item.label) }}</span>
        </router-link>
      </div>
    </template>

    <template #end>
      <div class="window-buttons">
        <Button
          v-for="(button, index) in buttons"
          :key="index"
          :class="`transparent border-noround ${button.class}`"
          @click="button.click"
        >
          <component
            :is="button.icon"
            class="text-color w-1rem h-full"
          />
        </Button>
      </div>
    </template>
  </Toolbar>
</template>

<style scoped></style>
