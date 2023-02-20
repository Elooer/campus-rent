<template>
  <div class="home">
    <div class="wrap" @scroll="move" ref="wrap">
      <div v-for="(item, idx) in list" :key="idx" class="item" :style="{
        'height': item.num + 'px',
        'left': item.x + 'px',
        'top': item.y + 'px',
        'background-color': item.y > scrollTop - item.num - 2000 && item.y < scrollTop + 1000 + 2000 ? 'red' : '#666'
      }">
        {{ item.num }}
      </div>
    </div>
  </div>
</template>
 
<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue'

type List<T> = {
  x: T,
  y: T,
  num: T
}

const wrap = ref<HTMLElement | null>(null)
const state = reactive<{ list: List<number>[], scrollTop: number, counter: number }>({
  list: [],
  scrollTop: 0,
  counter: 0
})

const { list, scrollTop, counter } = toRefs(state)

let random = []
for (let i = 0; i < 100000; i++) {
  random.push(Math.floor(Math.random() * 10) * 10 + 100)
}

// 定义初始位置（这里预留的20px的margin）
let first = 20
let second = 20

// 计算每个方块的位置并添加到list里面
for (const num of random) {
  let x = 20
  let y = 0
  if (first <= second) { // 第一列
    y = first
    first += num + 20
  } else { // 第二列
    x = 290
    y = second
    second += num + 20
  }
  list.value.push({
    x,
    y,
    num
  })
}

const move = () => {
  counter.value++
  if (counter.value < 5) return
  const wrap1 = wrap.value
  scrollTop.value = (wrap1 as HTMLElement).scrollTop
  if (counter.value >= 5) counter.value = 0
}
</script>
 
<style lang="less" scoped>
.wrap {
  width: 750px;
  height: calc(100vh - 104px);
  overflow: auto;
  position: relative;
  background-color: rgb(222, 222, 222)
}

.item {
  width: 350px;
  position: absolute;
  border-radius: 10px;
}
</style>