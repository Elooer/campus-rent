import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// 数据持久化插件
import piniaPersist from 'pinia-plugin-persist'
const pinia = createPinia()
pinia.use(piniaPersist)
// 创建 Pinia 实例

import 'vant/lib/index.css'

createApp(App).use(router).use(pinia).mount('#app')
