<template>
  <div class="waterfull">
    <div class="waterfull__item" ref="wrap" v-for="(item, index) in records" :key="index" :index="index"
      :style="'height:' + item.height + 'px'">
      <template v-if="isInVisiblePages(visibleIndexs, index)">
        <div class="waterfull__item__left" :style="offsetTop(item.leftOffset as number)">
          <img class="img" v-for="item1 in item.leftData" :src="item1.coverImage"
            :style="getWidthAndHeight(item1.imgHeight / item1.imgWidth)" />
        </div>
        <div class="waterfull__item__right" :style="offsetTop(item.rightOffset as number)">
          <img class="img" v-for="item2 in item.rightData" :src="item2.coverImage"
            :style="getWidthAndHeight(item2.imgHeight / item2.imgWidth)" />
        </div>
      </template>

    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref, nextTick } from 'vue'

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

type FirstHandleData<T, U = number> = {
  data: T
  leftOffset?: U
  rightOffset?: U
}

type SecondHandleData<T, U = number> = {
  data: T
  leftOffset?: U
  rightOffset?: U
  leftData: T
  rightData: T
  height: U
}

type Records<T, U> = {
  data: T
  height: U
  leftData: T
  rightData: T
  leftOffset?: U
  rightOffset?: U
}[]

let tem = [
  {
    title: '我的初秋报到妆 | 分享初秋妆容 送唇釉',
    coverImage: 'https://dummyimage.com/750x1000/3c91ff/fff',
    imgHeight: 500,
    imgWidth: 375,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '科普｜一到换季😭脸就痒痒⁉️别慌，有救的🤜',
    coverImage: 'https://dummyimage.com/750x1000/ff3f50/fff',
    imgHeight: 500,
    imgWidth: 375,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '惊现秘密の花园⁉️只要0.1元就能邂逅🧚🏻‍♀️花仙子>>',
    coverImage: 'https://dummyimage.com/750x1000/70c743/fff',
    imgHeight: 500,
    imgWidth: 375,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '辟谣第三弹💣黑头可以根除❓',
    coverImage: 'https://dummyimage.com/750x1000/deb43b/fff',
    imgHeight: 500,
    imgWidth: 375,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '干燥到掉皮？！3️⃣招，让肌肤远离“多事之秋”‼️',
    coverImage: 'https://dummyimage.com/750x1000/efbf67/fff',
    imgHeight: 500,
    imgWidth: 375,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '0623#「小光环」精华使用打卡#中奖名单',
    coverImage: 'https://dummyimage.com/750x1000/c767ef/fff',
    imgHeight: 500,
    imgWidth: 375,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '秋季🍂护肤第一步：你的水补够了没？🌊',
    coverImage: 'https://dummyimage.com/750x1000/ef679f/fff',
    imgHeight: 500,
    imgWidth: 375,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '懒妹妹进！补水💦维稳💡清洁✨靠TA全搞定',
    coverImage: 'https://dummyimage.com/320x180/67d1e2/fff',
    imgHeight: 180,
    imgWidth: 320,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '无辜眼镜👓妆～不经意的可爱最为致命！',
    coverImage: 'https://dummyimage.com/750x1000/9b67ef/fff',
    imgHeight: 1080,
    imgWidth: 828,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春姐姐'
    }
  },
  {
    title: '3️⃣步精简护肤💦清爽男友我先get！',
    coverImage: 'https://dummyimage.com/750x1000/6fcc68/fff',
    imgHeight: 1000,
    imgWidth: 750,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  }
]




const offsetTop = (offset: number) => {
  return offset > 0
    ? 'top: -' + offset + 'px'
    : ''
}


const defaultArticles = ref<RowDataList[]>([...tem])
const io = ref<IntersectionObserver>()
const records = ref<Records<RowDataList[], number>>()
const arr = ref<NodeList>()
const visibleIndexs = ref<number[]>([-1, 0, 1])
const currentIndex = ref(0)

const isInVisiblePages = (visibleIndexs: number[], current: number) => {
  return visibleIndexs.indexOf(current) > -1
}

onMounted(() => {
  initScroll()
  watch(defaultArticles, handleArticleData)
  defaultArticles.value = [...defaultArticles.value, ...tem]
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

  handleWaterfullList(allList)
}


const handleWaterfullList = (list: FirstHandleData<RowDataList[]>[]) => {
  (list as SecondHandleData<RowDataList[]>[]).forEach((item: SecondHandleData<RowDataList[]>, index: number) => {
    const isLast = index + 1 === list.length
    let leftHeight = 0 - item.leftOffset! || 0
    let rightHeight = 0 - item.rightOffset! || 0
    const leftData: RowDataList[] = []
    const rightData: RowDataList[] = []
    item.data.forEach(article => {
      if (leftHeight <= rightHeight) {
        leftHeight += article.imgHeight / article.imgWidth * document.documentElement.clientWidth / 2
        leftData.push(article)
      } else {
        rightHeight += article.imgHeight / article.imgWidth * document.documentElement.clientWidth / 2
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
      } else {
        io.value?.unobserve((arr.value as any)[entry])
      }
    }
  }, {
    rootMargin: '0px',
    threshold: 0.5
  })
}
createObserve()

watch(records, () => {
  arr.value = document.querySelectorAll('.waterfull__item')
  nextTick(() => {
    arr.value!.forEach(item => {
      io.value?.observe(item as Element)
    })
  })
})


const getWidthAndHeight = (ratio: number) => {
  return { width: '100%', height: `calc(${ratio} * 50vw)` }
}

const initScroll = () => {
  //初始化滑动事件监听器
  window.addEventListener('scroll', scrollListener)
}


const scrollListener = () => {
  // screen.availHeight表示屏幕高度
  // document.documentElement.scrollTop表示当前页面滚动条的位置,documentElement对应的是html标签,body对应的是body标签
  // document.compatMode用来判断当前浏览器采用的渲染方式,CSS1Compat表示标准兼容模式开启
  let scrollY = document.documentElement.scrollTop || document.body.scrollTop // 滚动条在Y轴上的滚动距离
  let vh = document.compatMode === 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight // 页面的可视高度（能看见的）
  let allHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) // 页面的总高度（所有的）
  // console.log('scrollY', scrollY + vh)
  // console.log('allHeight', allHeight - 300)
  if ((scrollY + vh) >= (allHeight - 1)) { // 当滚动条滑到页面底部
    defaultArticles.value = [...defaultArticles.value, ...tem]
  }
}


onUnmounted(() => {
  //退出时销毁上滑加载监听的滚动事件
  window.removeEventListener('scroll', scrollListener)
  io.value?.disconnect()
})

</script>
<style lang="less" scoped>
.waterfull {
  padding: 0 12rpx;
  background-color: @bgc;
}

.waterfull__item {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.waterfull__item__left,
.waterfull__item__right {
  position: absolute;
  top: 0;
  width: 50vw;
}

.waterfull__item__left {
  left: 0;
}

.waterfull__item__right {
  right: 0;
}
</style>
