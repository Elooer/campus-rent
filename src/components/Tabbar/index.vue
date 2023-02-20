<template>
  <div class="index">
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="add-o" to="/publish">发布</van-tabbar-item>
      <van-tabbar-item icon="chat-o" to="/message">消息</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'

const active = ref(0)

</script>
<style lang="less" scoped></style>
