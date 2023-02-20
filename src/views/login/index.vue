<template>
  <div class="login-container">
    <Transition name="v">
      <Login v-if="current === 'toLogin'" @logEvent="handleEvent" />
      <Register v-else @regEvent="handleEvent" />
    </Transition>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

const current = ref<string>("toLogin")

const handleEvent = (value: 'toLogin' | 'toRegister') => {
  current.value = value
}
</script>
<style lang="less">
.v-enter {
  /*过度进入时初始状态*/
  opacity: 0;
  transform: translateX(100px);
}

.v-enter-to,
.v-leave {
  /*进入过度结束状态 & 过度结束离开初始状态*/
  opacity: 1;
  transform: translateX(0px);
}

.v-leave-to {
  /*过度结束状态*/
  opacity: 0;
  transform: translateX(-100px);
}

.v-enter-active,
.v-leave-active {
  /*过度动效*/
  transition: all .4s ease;
}
</style>
