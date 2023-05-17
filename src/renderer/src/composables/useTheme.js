import { usePrimeVue } from 'primevue/config'
import {computed} from "vue";

export function useTheme() {
  const store = window.api.store
  const PrimeVue = usePrimeVue()
  const Themes = {
    Light: 'viva-light',
    Dark: 'viva-dark'
  }

  const currentTheme = ref(store.get('theme') || Themes.Light)
  const reversedTheme = computed(() =>
    currentTheme.value === Themes.Light ? Themes.Dark : Themes.Light
  )

  function initializeTheme() {
    PrimeVue.changeTheme(Themes.Dark, currentTheme.value, 'theme-link', () => {});
  }

  function setTheme(theme) {
    console.log('setTheme',currentTheme.value, theme)
    PrimeVue.changeTheme(currentTheme.value, theme, 'theme-link', () => {});
  }

  function toggleTheme() {
    PrimeVue.changeTheme(currentTheme.value, reversedTheme.value, 'theme-link', () => {})
    store.set('theme', reversedTheme.value)
    currentTheme.value = reversedTheme.value
  }

  return { Themes, currentTheme, toggleTheme, setTheme, initializeTheme }
}
