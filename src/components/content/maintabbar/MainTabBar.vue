<template>
  <HelloWorld>
    <TabBarItem path="/home">
      <span slot="item-img" class="iconfont icon-shouye"></span>
      <span slot="item-text">首页</span>
    </TabBarItem>
    <TabBarItem path="/category">
      <span slot="item-img" class="iconfont icon-all text"></span>
      <span slot="item-text">分类</span>
    </TabBarItem>
    <TabBarItem path="/card">
      <span slot="item-img" class="iconfont icon-bussiness-man text"></span>
      <span slot="item-text">购物车</span>
    </TabBarItem>
    <TabBarItem path="/profile">
      <span slot="item-img" class="iconfont icon-add-cart text"></span>
      <span slot="item-text">我的</span>
    </TabBarItem>
  </HelloWorld>
</template>

<script>
import HelloWorld from 'components/common/tabbar/HelloWorld'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
  components: {
    HelloWorld, TabBarItem
  }
}
</script>

<style scoped>

</style>
