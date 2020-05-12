<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表展示 -->
    <card-list></card-list>
    <!-- 底部汇总 -->
    <card-bottom-bar></card-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CardBottomBar from './childComps/cardBottomBar'
import CardList from './childComps/cardList'
import { mapGetters } from 'vuex'
export default {
  components: {
    CardList,
    NavBar,
    CardBottomBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  },
  methods: {
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: var(--color-background);
    font-weight: 700;
  }
  .cart {
    height: 100vh;
  }
</style>
