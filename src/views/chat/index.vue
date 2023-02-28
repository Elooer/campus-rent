<template>
  <div class="chat_container">
    <van-nav-bar title="用户名" left-text="返回" left-arrow @click-left="() => router.back()" />
    <div v-for="i in 200">啦啦啦</div>
    <div class="bottom">
      <van-field v-model="message" placeholder="请输入用户名" />
      <van-button round color="#7080e4" type="primary">发送</van-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const state = reactive({
  message: ''
})

const { message } = toRefs(state)

const route = useRoute()
const router = useRouter()
onMounted(() => {
  console.log(route.query);
})


</script>
<style lang="less" scoped>
.chat_container {
  background-color: @bgc;

  .van-nav-bar {
    position: sticky;
    top: 0;
  }

  .bottom {
    display: flex;
    position: fixed;
    align-items: end;
    background-color: #fff;
    bottom: 0;
    height: 6vh;
    width: 750px;
    padding-left: 15px;

    .van-field {
      width: 600px;
      height: 100%;
      line-height: 6vh;
      font-size: 30px;
    }

    .van-button {
      flex: 1;
      margin-left: 10px;
    }
  }
}
</style>
