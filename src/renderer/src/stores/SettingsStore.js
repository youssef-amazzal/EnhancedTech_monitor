import { defineStore } from 'pinia'
import {computed, reactive} from "vue";
import {watchImmediate} from "@vueuse/core";
import {useI18n} from "vue-i18n";

export const useSettingsStore = defineStore('settings', () => {
  const store = window.api.store

  // Theme Settings
  const Themes = {
    Light: 'viva-light',
    Dark: 'viva-dark'
  }

  const theme = reactive({
    current: store.get('theme') || Themes.Light,
    reversed: computed(() =>
      theme.current === Themes.Light ? Themes.Dark : Themes.Light
    ),
    toggle: () => {
      theme.current = theme.reversed
    }
  })

  watchImmediate(() => theme.current, (val) => {
    document.getElementById('theme-link').setAttribute('href', `src/assets/css/${val}/theme.css`);
    store.set('theme', val)
  });


  // Language Settings
  const {availableLocales, locale } = useI18n();

  const lang = reactive({
    current: store.get('lang') || locale.value,
    toggle: () => {
      const locales = availableLocales;
      lang.current = locales[(locales.indexOf(lang.current) + 1) % locales.length];
    }
  })

  watchImmediate(() => lang.current, (val) => {
    store.set('lang', val)
    locale.value = val;
  });

  return { theme, lang }
})
