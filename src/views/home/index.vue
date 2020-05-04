<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" @pulling="loadMore" :pullUpLoad="true" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <home-swiper :banner="banner" />
      <recommend-view :recommend="recommend"/>
      <feature/>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- 滚回头部 -->
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import Feature from './childComps/Featrue'
import RecommendView from './childComps/RecommendView'

import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home.js'
export default {
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      // 默认展示数据
      currentType: 'pop',
      // 控制返回顶部隐藏
      isShow: false
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  computed: {
    // 展示对应数据
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1.请求多个数据
    this.getList()
    this.getGoods('pop')
    this.getGoods('new')
    this.getGoods('sell')
  },
  methods: {
    /*
    * 事件监听
    *
    * */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      this.isShow = (-position.y) > 1000
    },
    loadMore() {
      this.getGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },
    /*
    *
    * 网络请求
    * */
    async getList() {
      const res = await getHomeMultidata()
      if (!res.success) return console.log('请求失败')
      this.banner = res.data.banner.list
      this.recommend = res.data.recommend.list
    },
    async getGoods(type) {
      const page = this.goods[type].page + 1
      const { data: res } = await getHomeGoods(type, page)
      const list = res.list
      this.goods[type].list.push(...list)
      // 继续加载更多次
      this.$refs.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
  }
  .home {
    position: relative;
    height: 100vh;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
