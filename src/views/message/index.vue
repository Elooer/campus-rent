<template>
  <div class="message_container">
    <van-nav-bar title="消息" />
    <div class="user_list">
      <div class="user_item" v-for="item in userList" @click="toChat(item)">
        <div class="avatar">
          <img :src="item.picture" alt="">
        </div>
        <div class="username">{{ item.username }}</div>
      </div>
    </div>
    <Tabbar />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router';
import Tabbar from '../../components/Tabbar/index.vue'
import { useMainStore } from '../../store'

type UserList = {
  uid: string
  username: string
  picture: string
}[]

const mainStore = useMainStore()

const state = reactive<{ userList: UserList }>({
  userList: []
})
const { userList } = toRefs(state)
userList.value = mainStore.userList

const router = useRouter()


const toChat = (item: any) => {
  console.log(item);

  router.push({
    name: 'Chat',
    query: item
  })
}

</script>
<style lang="less" scoped>
.message_container {
  position: relative;

  .van-nav-bar {
    position: sticky;
    top: 0;
    background-color: @theme-color;

    :deep(.van-nav-bar__title) {
      color: #fff;
    }
  }

  .user_list {
    padding-left: 20px;
    margin-bottom: 100px;

    .user_item {
      display: flex;
      height: 10vh;
      line-height: 8vh;
      padding-top: 1vh;

      .avatar {
        width: 90px;
        border-radius: 50%;

        img {
          width: 100%;
          border-radius: 50%;
        }
      }

      .username {
        font-weight: 400;
        font-size: 30px;
        line-height: 6vh;
        margin-left: 35px;
      }
    }
  }
}
</style>
