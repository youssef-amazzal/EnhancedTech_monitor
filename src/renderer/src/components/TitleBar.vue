<script setup>
import {useI18n} from 'vue-i18n'
import {ref} from 'vue'
import {useAppStore} from '../stores/AppStore'
import IconClose from '~icons/fluent-mdl2/chrome-close'
import IconRestore from '~icons/fluent-mdl2/chrome-restore'
import IconMinimize from '~icons/fluent-mdl2/chrome-minimize'
import {useSettingsStore} from '../stores/SettingsStore'

const {t} = useI18n()

const {view} = useAppStore()
const {lang, theme} = useSettingsStore()

const items = ref([
  {
    id: view.available.Home,
    label: 'titleBar.Home',
    icon: 'pi pi-fw pi-home',
    to: '/'
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

const buttons = [
  {
    id: 0,
    icon: IconMinimize,
    class: 'hover:bg-green-500',
    click: () => {
      lang.toggle()
    }
  },
  {
    id: 1,
    icon: IconRestore,
    class: 'hover:bg-yellow-500',
    click: () => {
      theme.toggle()
    }
  },
  {
    id: 2,
    icon: IconClose,
    class: 'hover:bg-red-500',
    click: () => {
      console.log('close')
    }
  }
]
</script>

<template>
  <Toolbar class="bg-transparent border-none align-items-start">
    <template #start>
      <img
        src="@/assets/logo.svg"
        class="h-2rem"
      >
    </template>

    <template #center>
      <div class="flex">
        <router-link
          v-for="item in items"
          :key="item.label"
          class="py-2 px-4 m-2 text-color no-underline hover:bg-gray-200 hover:text-900 focus:bg-blue-200 focus:text-900"
          :class="{ 'bg-blue-200 text-900': view.current === item.id }"
          :to="item.to"
          @click="view.set(item.id)"
        >
          <i :class="item.icon" />
          <span class="p-button-label">{{ t(item.label) }}</span>
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
