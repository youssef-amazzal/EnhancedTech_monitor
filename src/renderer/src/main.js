import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {i18n} from './assets/js/i18n'
import {router} from './routers/router'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';

import './assets/css/styles.scss';


const pinia = createPinia()
const app = createApp(App)

// router.beforeResolve(async to => {
//   if (to.meta.requireAuth) {
//     const {getUser} = useAuth();
//     const {error} = await getUser();
//     if (error) {
//       return {name: 'signin'}
//     }
//   }
// })

app.use(pinia)
app.use(i18n)
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.mount('#app')


