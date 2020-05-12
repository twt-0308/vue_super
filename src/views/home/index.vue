<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      ref="tabControl1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="tabControl"
      v-show="isTabFixed"
    />
    <scroll class="content"
            @pulling="loadMore"
            :pullUpLoad="true"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <home-swiper ref="homeSwiper" :banner="banner" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommend="recommend"/>
      <feature/>
      <tab-control
              ref="tabControl2"
              :titles="['流行', '新款', '精选']"
              @tabClick="tabClick"
      />
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

import { getHomeMultidata, getHomeGoods } from 'network/home.js'
import { backTopMixin } from 'common/mixin.js'
import { debounce } from 'common/utils.js'
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
      // 吸顶位置
      tabOffsetTop: 0,
      isTabFixed: false,
      // 记录离开时的 y 轴
      scrollY: 0
    }
  },
  mixins: [backTopMixin],
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature,
    TabControl,
    GoodsList,
    Scroll
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
    // 2.请求商品数据
    this.getGoods('pop')
    this.getGoods('new')
    this.getGoods('sell')
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    // 监听图片加载
    this.$bus.$on('homeImageLoad', () => {
      this.$refs.scroll && refresh()
    })
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.scrollY, 0)
    this.$refs.scroll.refresh()
    // 开启轮播图
    this.$refs.homeSwiper.$refs.people.startTimer()
    // console.log(this.scrollY)
  },
  deactivated() {
    this.scrollY = this.$refs.scroll.getScrollY()
    // console.log(this.scrollY)
    // 离开停止轮播图
    this.$refs.homeSwiper.$refs.people.stopTimer()
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShow = (-position.y) > 1000
      // 2.决定tabControl是否吸顶（position: fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },
    // 监听轮播图加载
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
  .tabControl {
    position: relative;
    z-index: 9;
  }
</style>
