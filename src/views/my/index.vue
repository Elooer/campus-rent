<template>
  <div class="my_container">
    <MyHeader />
    <div class="my_card">
      <div class="my_card_item" @click="toMyInfo">我的资料</div>
      <div class="my_card_item" v-for="item in 7">我的交易</div>
    </div>
    <van-button color="#7080e4" round type="primary" v-if="mainStore.token" @click="logout">
      退出登录
    </van-button>
    <Tabbar />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useMainStore } from '../../store/index'
import Tabbar from '../../components/Tabbar/index.vue'
import MyHeader from './components/MyHeader.vue'
import router from '../../router';
import { showNotify } from 'vant';

const mainStore = useMainStore()

const toMyInfo = () => {
  router.push('/myInfo')
}

const logout = () => {
  mainStore.deleteToken()
  showNotify({ type: 'success', message: '已退出登录！' })
  setTimeout(() => location.reload(), 300)
}

</script>
<style lang="less" scoped>
.my_container {
  background-color: @bgc;
  height: 100vh;

  .my_card {
    height: 50%;
    margin: 5vh 50px;

    & :not(:last-child) {
      border-bottom: 1px solid #eee;
    }
  }

  .my_card_item {
    height: 12.5%;
    background-color: #fff;
    line-height: 6.3vh;
    padding-left: 30px;
    color: #3d3d3d;
  }

  .van-button {
    margin-left: 75px;
    width: 600px;
  }
}
</style>
