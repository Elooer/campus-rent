<template>
  <div class="container">
    <van-nav-bar left-text="返回" right-text="注册" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="login_title">欢迎使用校园租</div>
    <div class="form_box">
      <div class="logo">
        <img src="@/assets/icons/renew.png" alt="">
      </div>
      <van-form @submit="login">
        <van-cell-group>
          <!-- 通过 pattern 进行正则校验 -->
          <van-field v-model="username" name="username" placeholder="请输入用户名"
            :rules="[{ validator: validatorMessage }, { pattern: usernamePattern, message: '用户名在2~8个字符范围' },]" />
          <!-- 通过 validator 进行函数校验 -->
          <van-field v-model="password" type="password" name="password" placeholder="请输入密码"
            :rules="[{ validator: validatorMessage }, { pattern: passwordPattern, message: '密码由6~12数字或字母组成' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button color="#7080e4" round block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { FieldRuleValidator, showNotify } from 'vant'
import { getUserInfo, loginApi } from '../../../api/user'
import { useMainStore } from '../../../store/index'
import router from '../../../router';

const username = ref<string>('')
const password = ref<string>('')
const usernamePattern = /^[\u4e00-\u9fa5a-zA-Z0-9]{2,8}$/
const passwordPattern = /^[a-zA-Z0-9]{6,12}$/
const emits = defineEmits<{ (e: 'logEvent', value: 'toRegister'): void }>()

const onClickLeft = () => history.back()
const onClickRight = () => {
  emits('logEvent', 'toRegister')
}

const mainStore = useMainStore()

// 校验函数可以直接返回一段错误提示
const validatorMessage: FieldRuleValidator = (val) => {
  if (val.trim().length < 1) return '请输入内容'
  return true
}


const login = async () => {

  const res = await loginApi({ username: username.value, password: password.value })
  mainStore.setToken(res.data as string)
  if (res.flag) {
    showNotify({ type: 'success', message: res.msg })
    const { data: info } = await getUserInfo()
    mainStore.setUserInfo(info)
    setTimeout(() => router.push('/my'), 300)
  } else {
    showNotify({ type: 'danger', message: res.msg })
  }
}



</script>
<style lang="less" scoped>
.container {
  height: 100vh;
}

:deep(.van-nav-bar__text) {
  color: @theme-color;
}

.login_title {
  width: 375px;
  margin: auto;
  text-align: center;
  font-size: 50px;
  margin-top: 10vh;
  color: @theme-color;
}

.form_box {
  position: relative;
  height: 50vh;
  margin-top: 18vh;
  padding: 50px;

  .logo {
    position: absolute;
    top: -5vh;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;

    img {
      width: 100%;
    }
  }

  .van-field {
    // border-bottom: 1px solid #000;
    margin-bottom: 5vh;
    border-bottom: 1px solid #e0e0e0;
    font-size: 30px;
    padding: 20px 0;
  }
}
</style>