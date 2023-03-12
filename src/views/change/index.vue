<template>
  <div class="change_container">
    <div v-if="route.query.item === 'avatar'" class="avatar">
      选择头像：<van-uploader :after-read="afterRead" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { changeAvatar, uploadAvatar } from '../../api/user'
import { useMainStore } from '../../store'

const route = useRoute()
const router = useRouter()
const mainStore = useMainStore()

const afterRead = async (file: any) => {
  // 此时可以自行将文件上传至服务器
  console.log(file.file);
  const forms = new FormData()
  forms.append("file", file.file)
  const res = await uploadAvatar(forms)
  console.log(res);

  const msg = await changeAvatar({ picture: 'https://lapichang.top/' + res.msg })
  if (msg.flag) {
    let obj = JSON.parse(JSON.stringify(mainStore.userinfo))
    obj.picture = 'https://lapichang.top/' + res.msg
    mainStore.setUserInfo(obj)
    router.push('/my')
  }

};


</script>
<style lang="less" scoped>
.change_container {
  background-color: @bgc;
  padding: 30px;
  height: 100vh;

  .avatar {
    height: 100px;
  }
}
</style>
