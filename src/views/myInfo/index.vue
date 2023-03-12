<template>
  <div class="myinfo_container">
    <div class="box">
      <div class="box_item" @click="toChange('avatar')">头像</div>
      <div class="box_item" @click="toChange('username')">用户名</div>
      <div class="box_item" @click="toChange('sex')">性别</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import router from '../../router';

const toChange = (item: string) => {
  router.push({
    name: 'Change',
    query: { item }
  })
}

</script>
<style lang="less" scoped>
.myinfo_container {
  height: 100vh;
  background-color: @bgc;
  padding: 30px;

  .box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 690px;
    background-color: #fff;

    .box_item {
      height: 100px;
      line-height: 100px;
      padding-left: 20px;
    }
  }
}
</style>
