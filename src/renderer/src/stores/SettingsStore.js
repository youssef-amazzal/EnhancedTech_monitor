import {defineStore} from 'pinia'
import {computed, reactive} from "vue";
import {usePreferredDark, watchImmediate} from "@vueuse/core";
import {useI18n} from "vue-i18n";
import {LocalStore} from "../assets/js/Local";
import {enUS, fr} from "date-fns/locale";
import DarkLogo from '../assets/logo_dark.svg'
import LightLogo from '../assets/logo_light.svg'

export const useSettingsStore = defineStore('settings', () => {

  // Theme Settings
  const Themes = {
    Light: 'light',
    Dark: 'dark',
    System: 'system',
  }


  const isDark = usePreferredDark();

  const theme = reactive({
    current: LocalStore.get('theme') || Themes.System,
    set: (val) => {
      theme.current = val
    },
    logo: computed(() => {
      switch (theme.current) {
        case Themes.Light: return LightLogo;
        case Themes.Dark: return DarkLogo;
        case Themes.System: return isDark ? DarkLogo : LightLogo;
      }
    }),
    reversed: computed(() =>
      theme.current === Themes.Light ? Themes.Dark : Themes.Light
    ),
    toggle: () => {
      theme.current = theme.reversed
    }
  })


  watchImmediate(() => isDark.value, (val) => {
    if (theme.current === Themes.System) {

      document.getElementById('theme-link').setAttribute('href', `src/assets/css/${val ? Themes.Dark : Themes.Light}/theme.css`);
    }
  });

  watchImmediate(() => theme.current, (val) => {
    LocalStore.set('theme', val)
    if (val === Themes.System) {
      const theme = isDark.value ? Themes.Dark : Themes.Light
      document.getElementById('theme-link').setAttribute('href', `src/assets/css/${theme}/theme.css`);
    } else {
      document.getElementById('theme-link').setAttribute('href', `src/assets/css/${val}/theme.css`);
    }
  });


  // Language Settings
  const {locale} = useI18n();

  const locales = {
    en: {
      key: 'en',
      name: 'English',
      dateFormat: enUS,
    },
    fr: {
      key: 'fr',
      name: 'Français',
      dateFormat: fr,
    }
  }

  const lang = reactive({
    current: locales[LocalStore.get('lang')] || locales[locale.value],
    get: computed(() => lang.current),
    set: (val) => {
      lang.current = locales[val] || locales[locale.value]
    },
    toggle: () => {
      lang.current = lang.current.key === locales.en.key ? locales.fr : locales.en
    }
  })

  watchImmediate(() => lang.current, (val) => {
    locale.value = val.key
    LocalStore.set('lang', val.key)
  });

  return {theme, lang}
})
