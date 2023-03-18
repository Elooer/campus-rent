<template>
  <div class="waterfall">
    <div class="waterfall__item" ref="wrap" v-for="(item, index) in records" :key="index" :index="index"
      :style="'height:' + item.height + 'px'">
      <template v-if="isInVisiblePages(visibleIndexs, index)">
        <div class="waterfall__item__left" :style="offsetTop(item.leftOffset as number)">
          <Card :cardData="item.leftData" />
        </div>
        <div class="waterfall__item__right" :style="offsetTop(item.rightOffset as number)">
          <Card :cardData="item.rightData" />
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref, nextTick } from 'vue'
import { getAllGoods } from '../../../api/goods'
import { getFriends } from '../../../api/message'
import Card from './Card.vue'
import { useMainStore } from '../../../store'

const mainStore = useMainStore()

const offsetTop = (offset: number) => {
  return offset > 0
    ? 'top: -' + offset + 'px'
    : ''
}

const defaultArticles = ref<RowDataList[]>([])
const io = ref<IntersectionObserver>()
const records = ref<Records<RowDataList[], number>>()
const arr = ref<NodeList>()
const visibleIndexs = ref<number[]>([-1, 0, 1])
const currentIndex = ref(0)
const isInVisiblePages = (visibleIndexs: number[], current: number) => {
  return visibleIndexs.indexOf(current) > -1
}

onMounted(async () => {
  initScroll()
  const list = await getFriends()
  mainStore.changeUserList(list.data as any)
  watch(defaultArticles, handleArticleData)
  const res = await getAllGoods()
  defaultArticles.value = res.data as RowDataList[]

})

const handleArticleData = (list: RowDataList[]) => {
  const _list = [...list]
  const allList = []
  while (_list.length) {
    const currentList = _list.splice(0, 10)
    allList.push({
      data: currentList
    })
  }
  handleWaterfallList(allList)
}
const handleWaterfallList = (list: FirstHandleData<RowDataList[]>[]) => {
  (list as SecondHandleData<RowDataList[]>[]).forEach((item: SecondHandleData<RowDataList[]>, index: number) => {
    const isLast = index + 1 === list.length
    let leftHeight = 0 - item.leftOffset! || 0
    let rightHeight = 0 - item.rightOffset! || 0
    const leftData: RowDataList[] = []
    const rightData: RowDataList[] = []
    item.data.forEach(article => {
      if (leftHeight <= rightHeight) {
        leftHeight += article.pictureHeight / article.pictureWidth * document.documentElement.clientWidth / 2 + 70
        leftData.push(article)
      } else {
        rightHeight += article.pictureHeight / article.pictureWidth * document.documentElement.clientWidth / 2 + 70
        rightData.push(article)
      }
    })
    if (!isLast) {
      const offset = Math.abs(leftHeight - rightHeight)
      const nextIndex = index + 1
      if (leftHeight >= rightHeight) {
        list[nextIndex].rightOffset = offset
        list[nextIndex].leftOffset = 0
      } else {
        list[nextIndex].leftOffset = offset
        list[nextIndex].rightOffset = 0
      }
    }
    item.leftData = leftData
    item.rightData = rightData
    item.height = Math.max(leftHeight, rightHeight)
  })
  records.value = list as Records<RowDataList[], number>
}

const createObserve = () => {
  io.value = new IntersectionObserver(function (entries) {
    for (let entry in entries) {
      if (entries[entry].intersectionRatio > 0) {
        let index = Number(entries[entry].target.getAttribute('index'))
        currentIndex.value = index
        visibleIndexs.value = [index - 1, index, index + 1]
      }
    }
  }, {
    rootMargin: '0px',
    threshold: 0.5
  })
}

createObserve()
watch(records, () => {
  arr.value = document.querySelectorAll('.waterfall__item')
  nextTick(() => {
    arr.value!.forEach(item => {
      io.value?.observe(item as Element)
    })
  })
})

const initScroll = () => {
  //初始化滑动事件监听器
  window.addEventListener('scroll', scrollListener)
}

function throttled(fn: any, delay = 300) {
  let timer: any = null
  return function (...args: any[]) {
    if (!timer) {
      timer = setTimeout(() => {
        fn()
        timer = null
      }, delay);
    }
  }
}
const scrollListener = () => {
  // screen.availHeight表示屏幕高度
  // document.documentElement.scrollTop表示当前页面滚动条的位置,documentElement对应的是html标签,body对应的是body标签
  // document.compatMode用来判断当前浏览器采用的渲染方式,CSS1Compat表示标准兼容模式开启
  let scrollY = document.documentElement.scrollTop || document.body.scrollTop // 滚动条在Y轴上的滚动距离
  let vh = document.compatMode === 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight // 页面的可视高度（能看见的）
  let allHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) // 页面的总高度（所有的）

  // throttled(() => {
  //   if ((scrollY + vh) >= (allHeight - 1)) { // 当滚动条滑到页面底部
  //     defaultArticles.value = [...defaultArticles.value, ...tem]
  //   }
  // })()
}

onUnmounted(() => {
  //退出时销毁上滑加载监听的滚动事件
  window.removeEventListener('scroll', scrollListener)
  io.value?.disconnect()
})
</script>
<style lang="less" scoped>
.waterfall {
  padding: 0 12rpx;
  background-color: @bgc;
}

.waterfall__item {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.waterfall__item__left,
.waterfall__item__right {
  position: absolute;
  top: 0;
  width: calc(50vw - 15px);
}

.waterfall__item__left {
  left: 0;
  margin: 0 5px 0 10px;
}

.waterfall__item__right {
  right: 0;
  margin: 0 10px 0 5px;
}
</style>