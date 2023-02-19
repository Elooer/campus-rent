<template>
  <van-sticky>
    <div class="search">
      <van-search shape="round" :background="background" placeholder="请输入搜索关键词" @focus="toSearchDetail" />
    </div>
  </van-sticky>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import router from '../../router'
import { showLoadingToast } from 'vant'
import 'vant/es/toast/style'

interface Props {
  background: string
  push?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  push: false
})

const toSearchDetail = () => {
  if (props.push) {
    router.push('/searchDetail')
  }
}
</script>
<style lang="less" scoped></style>
