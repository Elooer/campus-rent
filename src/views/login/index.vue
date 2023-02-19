<template>
  <Login v-if="current === 'toLogin'" @logEvent="handleEvent" />
  <Register v-else @regEvent="handleEvent" />
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
<style lang="less"></style>
