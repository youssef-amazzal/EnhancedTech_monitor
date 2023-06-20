import {defineStore} from 'pinia'
import {computed, reactive} from "vue";
import {usePreferredDark, watchImmediate} from "@vueuse/core";
import {useI18n} from "vue-i18n";
import {LocalStore} from "../assets/js/Local";
import {enUS, fr} from "date-fns/locale";
import DarkLogo from '../assets/logo_dark.svg'
import LightLogo from '../assets/logo_light.svg'
import DarkCss from '../assets/css/dark/theme.css'
import LightCss from '../assets/css/light/theme.css'

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
        default: return LightLogo;
      }
    }),
    reversed: computed(() =>
      theme.current === Themes.Light ? Themes.Dark : Themes.Light
    ),
    toggle: () => {
      theme.current = theme.reversed
    }
  })

  const createThemeStyle = () => {
    const style = document.createElement('style');
    style.id = 'theme-style';
    style.innerHTML = theme.current === Themes.Dark ? DarkCss : LightCss;
    document.head.appendChild(style);
  };

  watchImmediate(() => isDark.value, (val) => {
    if (theme.current === Themes.System) {
      const style = document.getElementById('theme-style');
      if (style) {
        style.innerHTML = val ? DarkCss : LightCss;
      } else {
        createThemeStyle();
      }
    }
  });

  watchImmediate(() => theme.current, (val) => {
    LocalStore.set('theme', val)
    const style = document.getElementById('theme-style');
    if (val === Themes.System) {
      const theme = isDark.value ? Themes.Dark : Themes.Light
      if (style) {
        style.innerHTML = theme === Themes.Dark ? DarkCss : LightCss;
      } else {
        createThemeStyle();
      }
    } else {
      if (style) {
        style.innerHTML = val === Themes.Dark ? DarkCss : LightCss;
      } else {
        createThemeStyle();
      }
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
