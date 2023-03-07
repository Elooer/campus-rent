<template>
  <div class="card" v-for="(left, index1) in cardData">
    <img class="cover_img" :src="left.coverImage" :style="getWidthAndHeight(left.imgHeight / left.imgWidth)" />
    <div class="describe">{{ index1 }}描述描述描述描述描述描述描述描述描述</div>
    <div class="price">￥100</div>
    <div class="publisher">
      <img class="avatar" src="https://avatars.githubusercontent.com/u/75289160?v=4">
      <div class="username">张三</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
interface RowDataList {
  title: string
  coverImage: string
  imgHeight: number
  imgWidth: number
  creator: {
    avatar: string
    nickname: string
  }
}
const props = defineProps<{
  cardData: RowDataList[]
}>()

const getWidthAndHeight = (ratio: number) => {
  return { width: '100%', height: `calc(${ratio} * 50vw)` }
}

</script>
<style lang="less" scoped>
.card {
  margin: 3px 0;
  background-color: #fff;
  margin-bottom: 10px;

  .cover_img {
    border-radius: 3%;
  }

  .describe {
    height: 28px;
    line-height: 28px;
    font-size: 28px;
    color: #393838;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .price {
    height: 30px;
    font-size: 30px;
    line-height: 30px;
    color: #fb3535;
  }

  .publisher {
    display: flex;
    align-items: center;
    height: 50px;

    .avatar {
      width: 50px;
      border-radius: 50%;
    }

    .username {
      font-size: 15px;
      margin-left: 10px;
    }
  }
}
</style>
