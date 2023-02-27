<template>
  <div class="index">
    <van-nav-bar title="消息" />
    <div class="user_list">
      <div class="user_item">
        <div class="avatar"></div>
        <div class="username"></div>
      </div>
    </div>
    <Tabbar />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Tabbar from '../../components/Tabbar/index.vue'

const state = reactive({
  userList: []
})

</script>
<style lang="less" scoped>
.van-nav-bar {
  background-color: @theme-color;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
</style>
