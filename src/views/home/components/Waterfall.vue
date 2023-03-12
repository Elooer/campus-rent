<template>
  <div class="waterfull">
    <div class="waterfull__item" ref="wrap" v-for="(item, index) in records" :key="index" :index="index"
      :style="'height:' + item.height + 'px'">
      <template v-if="isInVisiblePages(visibleIndexs, index)">
        <div class="waterfull__item__left" :style="offsetTop(item.leftOffset as number)">
          <Card :cardData="item.leftData" />
        </div>
        <div class="waterfull__item__right" :style="offsetTop(item.rightOffset as number)">
          <Card :cardData="item.rightData" />
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref, nextTick } from 'vue'
import Card from './Card.vue'
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
    coverImage: 'https://gd-hbimg.huaban.com/5b314d221d9b8a3f0185dae7c910333b451950974baf0-DOwmVi_fw320',
    imgHeight: 162,
    imgWidth: 189,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '科普｜一到换季😭脸就痒痒⁉️别慌，有救的🤜',
    coverImage: 'https://gd-hbimg.huaban.com/e83d73b87ca344f2c2978a98e91293b08100fe521820bb-qFhqUe_fw320',
    imgHeight: 251,
    imgWidth: 189,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '惊现秘密の花园⁉️只要0.1元就能邂逅🧚🏻‍♀️花仙子>>',
    coverImage: 'https://gd-hbimg.huaban.com/6a3d157cf428f98b4bc2cc0330d96a39ced73188e7c37-UpT15C_fw320',
    imgHeight: 125,
    imgWidth: 189,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '辟谣第三弹💣黑头可以根除❓',
    coverImage: 'https://gd-hbimg.huaban.com/f9bfd2504b9e53a7b71fcdd08036533f855814d724d783-OGEXVU_fw320',
    imgHeight: 183,
    imgWidth: 189,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '干燥到掉皮？！3️⃣招，让肌肤远离“多事之秋”‼️',
    coverImage: 'https://gd-hbimg.huaban.com/14aa1b3cf27386cffb7a8e38950b6187bd98b521107743-LNx1o5_fw320',
    imgHeight: 245,
    imgWidth: 189,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '0623#「小光环」精华使用打卡#中奖名单',
    coverImage: 'https://gd-hbimg.huaban.com/1650c5ef4fe8bc39d9cfde60e22abaa6dae1060330400-lDTVsa_fw320',
    imgHeight: 324,
    imgWidth: 189,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '秋季🍂护肤第一步：你的水补够了没？🌊',
    coverImage: 'https://gd-hbimg.huaban.com/8352f0be89c001aa20b53505543e3e14265a81a466740-POh8GZ_fw320',
    imgHeight: 189,
    imgWidth: 189,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '懒妹妹进！补水💦维稳💡清洁✨靠TA全搞定',
    coverImage: 'https://gd-hbimg.huaban.com/7a334626869925bf706175a4803ec5700b9ec3336161e-HpsvR9_fw320',
    imgHeight: 279,
    imgWidth: 189,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '无辜眼镜👓妆～不经意的可爱最为致命！',
    coverImage: 'https://gd-hbimg.huaban.com/e8897a140fb6265a04622417c435cadc07e0b04121fd2-BW7pl6_fw320',
    imgHeight: 144,
    imgWidth: 89,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春姐姐'
    }
  },
  {
    title: '3️⃣步精简护肤💦清爽男友我先get！',
    coverImage: 'https://gd-hbimg.huaban.com/4794fd35b56ef5b50c4ca20b97616782aff5d8d134565-kmvjP0_fw320',
    imgHeight: 284,
    imgWidth: 189,
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
        leftHeight += article.imgHeight / article.imgWidth * document.documentElement.clientWidth / 2 + 70
        leftData.push(article)
      } else {
        rightHeight += article.imgHeight / article.imgWidth * document.documentElement.clientWidth / 2 + 70
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
  arr.value = document.querySelectorAll('.waterfull__item')
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

  throttled(() => {
    if ((scrollY + vh) >= (allHeight - 1)) { // 当滚动条滑到页面底部
      defaultArticles.value = [...defaultArticles.value, ...tem]
    }
  })()
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
  width: calc(50vw - 15px);
}

.waterfull__item__left {
  left: 0;
  margin: 0 5px 0 10px;
}

.waterfull__item__right {
  right: 0;
  margin: 0 10px 0 5px;
}
</style>