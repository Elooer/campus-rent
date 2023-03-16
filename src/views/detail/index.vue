<template>
  <div class="detail_container">
    <div class="publisher">
      <div class="avatar">
        <img src="https://avatars.githubusercontent.com/u/75289160?v=4" alt="">
      </div>
      <div class="username">张三</div>
    </div>
    <div class="cover">
      <img src="https://gd-hbimg.huaban.com/5b314d221d9b8a3f0185dae7c910333b451950974baf0-DOwmVi_fw320">
    </div>
    <div class="name">商品名称</div>
    <div class="price">￥100</div>
    <div class="describe">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</div>
    <div class="action">
      <div class="collect">
        <van-icon name="star-o" size="25px" />
        <div>收藏</div>
      </div>
      <van-button color="#7080e4" icon="comment-o" type="primary" @click="toChat">
        聊聊
      </van-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import router from '../../router';

const toChat = () => {
  router.push('/chat')
}
</script>
<style lang="less" scoped >
.detail_container {
  .publisher {
    display: flex;
    height: 120px;
    line-height: 120px;
    padding-top: 10px;
    margin-bottom: 30px;
    box-shadow: 0 0 20px 4px rgba(0, 0, 0, 0.2);

    .avatar {
      width: 90px;
      border-radius: 50%;
      margin-left: 20px;

      img {
        width: 100%;
        border-radius: 50%;
      }
    }

    .username {
      font-weight: 400;
      font-size: 30px;
      line-height: 6vh;
      margin-left: 15px;
    }
  }

  .cover {
    width: 750px;

    img {
      width: 100%;
    }
  }

  .name {
    width: 750px;
    padding: 0 30px;
    font-size: 40px;
    margin-bottom: 15px;
  }

  .price {
    width: 750px;
    padding: 0 30px;
    font-size: 40px;
    color: #fb3535;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .describe {
    width: 750px;
    padding: 0 30px;
    font-size: 32px;
  }

  .action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    width: 750px;
    position: fixed;
    padding: 0 15px;
    bottom: 0;

    .collect {
      display: flex;
      flex-direction: column;
      font-size: 25px;
    }

    .van-button {
      width: 150px;
    }
  }
}
</style>
