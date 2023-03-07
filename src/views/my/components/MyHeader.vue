<template>
  <div class="header_container">
    <div class="header_box" v-if="mainStore.token">
      <div class="avatar">
        <img src="https://avatars.githubusercontent.com/u/75289160?v=4" alt="">
      </div>
      <div class="username">张三</div>
    </div>
    <div class="header_box" @click="toLogin" v-else>
      <div class="avatar">
        <img src="../../../assets/icons/unlogin.png" alt="">
      </div>
      <div class="username">请登录<van-icon name="arrow" /></div>
    </div>
    <div class="index">
      <div class="index_item">
        <div class="top" style="font-weight: 600;">0</div>
        <div class="bottom" style="color: #666">收藏</div>
      </div>
      <div class="index_item">
        <div class="top" style="font-weight: 600;">0</div>
        <div class="bottom" style="color: #666">关注</div>
      </div>
      <div class="index_item">
        <div class="top" style="font-weight: 600;">0</div>
        <div class="bottom" style="color: #666">帖子</div>
      </div>
      <div class="index_item">
        <div class="top" style="font-weight: 600;">0</div>
        <div class="bottom" style="color: #666">足迹</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '../../../store/index'

const mainStore = useMainStore()
const router = useRouter()

const toLogin = () => {
  router.push('/login')
}

</script>
<style lang="less" scoped>
.header_container {
  background: linear-gradient(@theme-color, #a0acf4, #d4d8f4);
  height: 25vh;
  overflow: hidden;

  .header_box {
    display: flex;
    height: 50%;
    margin: 8% 0 0 50px;
    padding-top: 2vh;

    .avatar {
      height: 10vh;
      width: 10vh;
      border-radius: 50%;

      img {
        width: 100%;
        border-radius: 50%;
      }
    }

    .username {
      font-weight: 400;
      font-size: 50px;
      line-height: 6vh;
      margin-left: 35px;
    }
  }

  .index {
    display: flex;
    height: 30%;

    .index_item {
      text-align: center;
      display: flex;
      flex-direction: column;
      width: 25%;
      height: 100%;

      .top,
      .bottom {
        font-size: 30px;
        height: 50%;
        line-height: 3.75vh;
      }
    }
  }

}
</style>
