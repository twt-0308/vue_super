<template>
  <div>
    <main-tab-bar/>
    <router-view/>
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
