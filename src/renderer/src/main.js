import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import PrimeVue from 'primevue/config'

const i18n = createI18n({
  // something vue-i18n options here ...
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(PrimeVue)
app.mount('#app')


