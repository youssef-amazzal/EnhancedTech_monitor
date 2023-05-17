import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('@/views/Home.vue') },
      { path: 'profile', component: () => import('@/views/Profile.vue') },
      { path: 'settings', component: () => import('@/views/Settings.vue') }
    ]
  },
]


export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
