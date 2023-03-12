import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/index.vue'),
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import('../views/publish/index.vue'),
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/message/index.vue'),
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/chat/index.vue'),
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/my/index.vue'),
  },
  {
    path: '/myInfo',
    name: 'MyInfo',
    component: () => import('../views/myInfo/index.vue'),
  },
  {
    path: '/change',
    name: 'Change',
    component: () => import('../views/change/index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/searchDetail',
    name: 'SearchDetail',
    component: () => import('../views/search-detail/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
