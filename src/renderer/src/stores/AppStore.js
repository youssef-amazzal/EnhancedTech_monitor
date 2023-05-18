import { defineStore } from "pinia";
import {reactive} from "vue";

export const useAppStore = defineStore('app', () => {

  const view = reactive({
    available: {
      Home: 'home',
      Profile: 'profile',
      Settings: 'settings'
    },
    current: 'home',
    set: (val) => {
      view.current = val
    }
  })

  return { view }
});
