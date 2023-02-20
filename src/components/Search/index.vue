<template>
  <div class="search-container">
    <van-sticky>
      <div class="search">
        <van-search shape="round" action-text="取消" :show-action="isShow" :background="background" placeholder="请输入搜索关键词"
          @focus="toSearchDetail" @cancel="onCancel" />
      </div>
    </van-sticky>
  </div>
</template>
<script lang="ts" setup>
import router from '../../router'
import { showToast } from 'vant'

interface Props {
  background?: string
  push?: boolean,
  isShow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  push: false,
  isShow: false
})

const onCancel = () => {
  router.push('/home')
}

const toSearchDetail = () => {
  if (props.push) {
    router.push('/searchDetail')
  }
}
</script>
<style lang="less" scoped></style>
