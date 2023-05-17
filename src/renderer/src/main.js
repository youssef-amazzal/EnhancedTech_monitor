import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { router } from './routers/router'
import App from './App.vue'
import PrimeVue from 'primevue/config'

import './assets/css/styles.scss';

import en from './locales/en.json'
import fr from './locales/fr.json'


const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  messages: {
    en,
    fr
  }
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(router)
app.use(PrimeVue)
app.mount('#app')


