<template>
  <div>
    <main-tab-bar/>
    <!-- 切换组件不销毁 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MainTabBar from '@/components/content/maintabbar/MainTabBar'
export default {
  components: {
    MainTabBar
  }
}
</script>

<style>
.active {
  color: red;
  background-color: rgba(0,0,0,.1);
}
</style>
