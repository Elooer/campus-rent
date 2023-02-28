<template>
  <div class="publish_container">
    <div class="publish_header">
      <div>取消</div>
      <div class="pub">发布</div>
    </div>
    <van-cell-group inset>
      <van-field v-model="information" rows="2" autosize type="textarea" maxlength="50" placeholder="请描述您的出租物品"
        show-word-limit />
    </van-cell-group>
    <van-uploader :after-read="afterRead" />
    <div class="price" @click="show = true">
      <div>价格</div>
      <div><span style="margin-right: 20px;color: #818fec;">￥ {{ price }}</span><van-icon name="arrow" /></div>
    </div>
    <van-number-keyboard :show="show" theme="custom" :extra-key="['00', '.']" close-button-text="完成" @blur="onBlur"
      @input="onInput" @delete="onDelete" />
    <Tabbar />
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import Tabbar from '../../components/Tabbar/index.vue'

const state = reactive({
  information: '',
  show: false,
  price: '0.0'
})

const { information, show, price } = toRefs(state)

const afterRead = (file: any) => {
  // 此时可以自行将文件上传至服务器

}

let s = ''
const onInput = (value: string) => {
  s += value
  price.value = s
}

const onDelete = () => {
  s = s.slice(0, s.length - 1)
  price.value = s
}

const onBlur = () => {
  show.value = false
  if (price.value[price.value.length - 1] === '.') {
    price.value += 0
  }
}

</script>
<style lang="less" scoped>
.publish_container {
  padding: 0 20px;

  .publish_header {
    display: flex;
    justify-content: space-between;
    height: 8vh;
    line-height: 8vh;
    font-size: 30px;

    .pub {
      text-align: center;
      width: 120px;
      height: 70%;
      border-radius: 50px;
      margin-top: 2%;
      line-height: 5.6vh;
      background-color: @theme-color;
      color: #3e3e3e;
    }
  }

  .price {
    display: flex;
    justify-content: space-between;
    height: 5vh;
    line-height: 5vh;
  }
}
</style>
