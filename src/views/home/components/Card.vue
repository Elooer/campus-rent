<template>
  <div class="card" v-for="(left, index) in cardData" @click="toDetail(index)">
    <img class="cover_img" :src="left.goodsPicture" :style="getWidthAndHeight(left.pictureHeight / left.pictureWidth)" />
    <div class="describe">{{ left.goodsDescribe }}</div>
    <div class="price">￥{{ left.goodsPrice }}</div>
    <div class="publisher">
      <img class="avatar" :src="left.picture">
      <div class="username">{{ left.username }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const props = defineProps<{
  cardData: RowDataList[]
}>()

const router = useRouter()

const getWidthAndHeight = (ratio: number) => {
  return { width: '100%', height: `calc(${ratio} * 50vw)` }
}

const toDetail = (index: number) => {
  const { goodsDescribe, picture, goodsPrice, goodsPicture, username, goodsName, uid } = props.cardData[index]
  router.push({
    name: 'Detail',
    query: { goodsDescribe, picture, goodsPrice, goodsPicture, username, goodsName, uid }
  })
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
