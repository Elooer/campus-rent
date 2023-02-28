import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// 创建 Pinia 实例
const pinia = createPinia()

import 'vant/lib/index.css'

createApp(App).use(router).use(pinia).mount('#app')
