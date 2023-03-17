<template>
  <div class="detail_container">
    <div class="publisher">
      <div class="avatar">
        <img :src="currentData.picture" alt="">
      </div>
      <div class="username">{{ currentData.username }}</div>
    </div>
    <div class="cover">
      <img :src="currentData.goodsPicture">
    </div>
    <div class="name">{{ currentData.goodsName }}</div>
    <div class="price">￥{{ currentData.goodsPrice }}</div>
    <div class="describe">{{ currentData.goodsDescribe }}</div>
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
import { showNotify } from 'vant'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addFriend, getFriends } from '../../api/message'
import { useMainStore } from '../../store'

// interface RowDataList {
//   uid: string
//   goodsDescribe: string
//   picture: string
//   goodsPrice: string
//   goodsPicture: string
//   username: string
//   goodsName: string
// }
const route = useRoute()
const router = useRouter()
const currentData = ref()
const mainStore = useMainStore()

currentData.value = route.query

const toChat = async () => {
  const myUid = mainStore.userinfo.uid
  const friendUid = parseInt(currentData.value!.uid)
  if (myUid === friendUid) {
    return showNotify({ type: 'danger', message: '您不能和自己聊天' })
  }

  const { goodsDescribe, picture, goodsPrice, goodsPicture, username, goodsName, uid } = currentData.value
  if (mainStore.userList.findIndex(item => parseInt(item.uid) === friendUid) !== -1) {
    console.log(1);

    router.push({
      name: 'Chat',
      query: { goodsDescribe, picture, goodsPrice, goodsPicture, username, goodsName, uid }
    })
  } else {
    console.log('这里');

    await addFriend({
      myUid,
      friendUid: currentData.value.uid
    })
    const list = await getFriends()
    mainStore.changeUserList(list.data as any)
    router.push({
      name: 'Chat',
      query: { goodsDescribe, picture, goodsPrice, goodsPicture, username, goodsName, uid }
    })
  }
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
