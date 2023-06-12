import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import {LocalStore} from "../assets/js/Local";

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

  const data = reactive({
    activeTask: JSON.parse(LocalStore.temp.get('activeTask') ?? '{}'),
    setActiveTask: (val) => {
      data.activeTask = JSON.parse(val)
      LocalStore.temp.set('activeTask', val)
    },
    LocalDocuments: [],
    localPages: computed(() => data.localDocuments.flatMap(doc => doc.pages)),
    dirtyPages: computed(() => data.localPages.filter(p => p.isDirty)),
    newActivities: computed(() => data.dirtyPages.map(p => p.activities.at(0))),

  })

  const activeIndex = ref(1);

  return {view, data, activeIndex}
});
