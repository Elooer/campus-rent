<template>
  <div class="chat_container">
    <van-nav-bar :title="userInfo.username" left-text="返回" left-arrow @click-left="() => router.back()" />
    <div class="dialog">
      <div class="middle" style="margin-bottom: 50px;">
        <div v-if="messageList.length">
          <div v-for="msg in messageList">
            <div class="msg" style="display: flex;justify-content: end;align-items: center;"
              v-if="msg.from === mainStore.userinfo.uid">
              <div class="bubble-msg-left"
                style="background-color: #fff;height: 40px;line-height: 40px;padding: 0 10px;margin-right: 10px">
                {{ msg.message }}
              </div>
              <div class=" avatar">
                <img alt="" :src="msg.from === mainStore.userinfo.uid ? mainStore.userinfo.picture : userInfo.picture" />
              </div>
            </div>
            <div class="msg" style="display: flex;justify-content: start;align-items: center;" v-else>
              <div class="avatar">
                <img alt="" :src="msg.from === mainStore.userinfo.uid ? mainStore.userinfo.picture : userInfo.picture" />
              </div>
              <div class="bubble-msg-right"
                style="background-color: #fff;height: 40px;line-height: 40px;padding: 0 10px;margin-left: 10px">
                {{ msg.message }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
    </div>
    <div class="bottom">
      <van-field v-model="msg" placeholder="请输入信息" />
      <van-button round color="#7080e4" type="primary" @click="sendMsg">发送</van-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, reactive, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMainStore } from '../../store'
import { pullMsg } from '../../api/message'

const state = reactive<Chat>({
  msg: '',
  interval: null,
  messageList: [],
  userInfo: {
    uid: '',
    goodsDescribe: '',
    pictureHeight: 0,
    pictureWidth: 0,
    picture: '',
    goodsPrice: '',
    goodsPicture: '',
    username: '',
    goodsName: ''
  },
  socket: null
})

const { messageList, userInfo, socket, msg, interval } = toRefs(state)

const route = useRoute()
const router = useRouter()
userInfo.value = route.query as any

const getMsg = async () => {
  const res = await pullMsg({
    myUid: mainStore.userinfo.uid,
    friendUid: userInfo.value.uid
  })

  messageList.value = res.data as MessageList
}

const mainStore = useMainStore()
onMounted(() => {
  getMsg()
  socket.value = new WebSocket(`ws://43.138.133.249:5523/websocket/${mainStore.userinfo.uid}`)
  socket.value.onmessage = async event => {
    messageList.value.push(JSON.parse(event.data))
    getMsg()
  }
})

onUnmounted(() => {
  // 清楚定时器的设置
  !interval.value && clearInterval(interval.value)
})

const sendMsg = (e: Event) => {
  if (e) {
    e.preventDefault()
  }
  if (!msg.value) {
    return
  }
  let entity = {
    from: mainStore.userinfo.uid,
    to: parseInt(userInfo.value.uid),
    message: msg.value,
    time: new Date()
  }
  socket.value?.send(JSON.stringify(entity))
  messageList.value.push(entity)
  msg.value = ''
}

</script>
<style lang="less" scoped>
.chat_container {
  background-color: @bgc;

  .msg {
    width: 750px;


  }


  .avatar {
    width: 100px;

    img {
      width: 100%;
      border-radius: 50%;
    }
  }

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
    margin-top: 100px;

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
