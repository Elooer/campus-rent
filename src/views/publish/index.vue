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
    <van-cell is-link title="价格" @click="show = true" />
    <van-action-sheet v-model:show="show" title="标题">
      <div class="content">
        <van-number-keyboard :show="show" theme="custom" :extra-key="['00', '.']" close-button-text="完成"
          @blur="show = false" @input="onInput" />
      </div>
    </van-action-sheet>
    <Tabbar />
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import Tabbar from '../../components/Tabbar/index.vue'

const state = reactive({
  information: '',
  show: false
})

const { information, show } = toRefs(state)

const afterRead = (file: any) => {
  // 此时可以自行将文件上传至服务器
  console.log(file);
}

const onInput = (value: string) => {
  console.log(value);

}

</script>
<style lang="less" scoped>
.publish_container {


  .publish_header {
    display: flex;
    justify-content: space-between;
    height: 8vh;
    line-height: 8vh;
    padding: 0 20px;
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

  .van-cell-group {
    width: 690px;
    margin: auto;

    .van-field__body {
      padding-left: 10px;
    }
  }

  .content {
    padding: 16px 16px 160px;
  }
}
</style>
