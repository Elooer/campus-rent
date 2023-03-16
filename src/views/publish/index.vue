<template>
  <div class="publish_container">
    <div class="publish_header">
      <div>取消</div>
      <div class="pub" @click="addHandler">发布</div>
    </div>
    <van-cell-group inset>
      <van-field v-model="information" rows="2" autosize type="textarea" maxlength="50" placeholder="请描述您的出租物品"
        show-word-limit />
    </van-cell-group>
    <van-uploader :after-read="afterRead" />
    <van-field v-model="goodsName" label="名称" placeholder="请输入出租物品名称" />
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
import { uploadAvatar } from '../../api/user'
import { addGoods } from '../../api/goods'
import useTimeFormat from '../../hooks/useTimeFormat'
import Tabbar from '../../components/Tabbar/index.vue'

const state = reactive({
  information: '',
  show: false,
  goodsName: '',
  price: '0.0',
  picture: ''
})

const { information, show, goodsName, price, picture } = toRefs(state)

const addHandler = async () => {
  const data = {
    goodsName: goodsName.value,
    goodsPrice: price.value,
    goodsDescribe: information.value,
    goodsTime: useTimeFormat(new Date()),
    goodsPicture: picture.value
  }
  const res = await addGoods(data)
  console.log(res);
}

const afterRead = async (file: any) => {
  const forms = new FormData()
  forms.append("file", file.file)
  const res = await uploadAvatar(forms)
  picture.value = 'https://lapichang.top/' + res.msg
}

let s = ''
const onInput = (value: string) => {
  s += value
  price.value = s
}

const onDelete = () => {
  if (price.value.split('.')[0].length <= 1) {
    price.value = '0.0'
    return
  }
  s = s.slice(0, s.length - 1)
  price.value = s
}

const onBlur = () => {
  show.value = false
  if (price.value[price.value.length - 1] === '.') {
    price.value += 0
  } else if (price.value.indexOf('.') === -1) {
    price.value += '.0'
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

  .van-field {
    height: 100px;
    font-size: 33px;
    line-height: 100px;
  }

  .price {
    display: flex;
    justify-content: space-between;
    height: 5vh;
    line-height: 5vh;
  }
}
</style>
