<template>
  <div class="index">
    <van-nav-bar title="消息" />
    <Tabbar />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Tabbar from '../../components/Tabbar/index.vue'
</script>
<style lang="less" scoped>
.van-nav-bar {
  background-color: @theme-color;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
</style>
