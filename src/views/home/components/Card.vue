<!-- <template>
  <div class="Card">
    <div
    class="article-box"
    wx:for="{{ data }}"
    wx:for-item="article"
    wx:for-index="articleIndex"
    wx:key="articleIndex">
    <div class="article">
      <div class="article__poster">
      	<image
        	class="article__poster__img"
          src="{{ article.coverImage }}"
          style="height: {{ article.realHeight }}rpx"
          mode="aspectFill" />
      </div>
      <div class="article__content">
        <div class="article__content__title">{{ article.title }}</div>
        <div class="article__content__creator">
        	<image
          	class="article__content__creator__avatar"
            src="{{ article.creator.avatar }}"
            mode="aspectFill" />
          <div class="article__content__creator__nickname">{{ article.creator.nickname }}</div>
        </div>
        <div
        	class="article__content__topic"
          wx:if="{{ article.topic }}">
        	<image
          	class="article__content__topic__icon"
            src="https://pub-img.perfectdiary.com/material/image/2021/05/5d604f0b034d4c7f9b857fb0919f3ee3.png" />
          <div class="article__content__topic__title">{{ article.topic.title }}</div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'

</script>
<style lang="less" scoped></style> -->
