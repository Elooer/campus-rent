<template>
  <div class="home_container">
    <Search background="#7080e4" :push="true" />
    <Waterfall />
    <Tabbar />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Search from '../../components/Search/index.vue'
import Tabbar from '../../components/Tabbar/index.vue'
import Waterfall from './components/Waterfall.vue';



</script>
<style lang="less" scoped>
.home_container {
  background-color: @bgc;
}
</style>
