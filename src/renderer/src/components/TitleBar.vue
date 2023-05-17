<script setup>
import { useI18n } from 'vue-i18n'
import {ref} from "vue";
import {useSettingsStore} from "../stores/SettingsStore";

const { t } = useI18n();
const {theme, lang } = useSettingsStore();

const items = ref([
  {
    label: 'titleBar.Home',
    icon: 'pi pi-fw pi-home',
    to: '/',
  },
  {
    label: 'titleBar.Profile',
    icon: 'pi pi-fw pi-user',
    to: '/profile',
  },
  {
    label: 'titleBar.Settings',
    icon: 'pi pi-fw pi-cog',
    to: '/settings',
  }
]);

</script>

<template>
  <Toolbar>
    <template #start>
      <img
        src="@/assets/logo.svg"
        class="h-2rem"
      >
    </template>

    <template #center>
      <tab-menu :model="items">
        <template #item="slotProps">
          <router-link :to="slotProps.item.to">
            <i :class="slotProps.item.icon" />
            <span>{{ t(slotProps.item.label) }}</span>
          </router-link>
        </template>
      </tab-menu>
    </template>

    <template #end>
      <Button
        icon="pi pi-times"
        severity="danger"
        @click="theme.toggle()"
      >
        {{ theme.current }}
      </Button>
      <Button
        icon="pi pi-times"
        severity="danger"
        @click="lang.toggle()"
      >
        {{ lang.current }}
      </Button>
    </template>
  </Toolbar>
</template>

<style scoped>

</style>
