import {createRouter, createWebHashHistory} from 'vue-router'
import {useAuth} from "../composables/useAuth";


const routes = [
  {
    name: 'auth',
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    redirect: '/auth/sign-in',
    children: [
      {name: 'signin', path: 'sign-in', component: () => import('@/views/auth/Signin.vue')},
      {name: 'signup', path: 'sign-up', component: () => import('@/views/auth/Signup.vue')},
      {path: 'forgot-password', component: () => import('@/views/auth/Signin.vue')},
    ]
  },
  {
    name: 'root',
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/home',
    beforeEnter: async (to, from, next) => {
      const {getUser} = useAuth();
      const {error} = await getUser();
      if (error) {
        next({name: 'signin'})
      } else {
        next()
      }
    },
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {requireAuth: true}
      },
      {
        name: 'task',
        path: 'task/:id',
        component: () => import('@/views/Task.vue'),
        meta: {requireAuth: true}
      },
      {
        name: 'profile',
        path: 'profile',
        component: () => import('@/views/Profile.vue'),
        meta: {requireAuth: true}
      },
      {
        name: 'settings',
        path: 'settings',
        component: () => import('@/views/Settings.vue'),
        meta: {requireAuth: true}
      }
    ]
  },
]


export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
