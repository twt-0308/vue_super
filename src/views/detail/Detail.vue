<template>
  <div id="detail">
    <detail-nav-bar class="detail-top" @titleClick="titleClick" ref="detailBar"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :topImages="topImage"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info ref="param" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top v-show="isShow" @click.native="backClick"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import { getDetail, Goods, Shop, GoodsParam, getRecommend } from '@/network/detail.js'
import { debounce } from 'common/utils.js'
import { backTopMixin } from 'common/mixin.js'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
export default {
  name: 'Detail',
  data() {
    return {
      id: '',
      topImage: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList
  },
  async created() {
    // 1. 保存传入的ID
    this.id = this.$route.params.id

    // 2. 根据id 请求详细数据
    const { result: res } = await getDetail(this.id)

    // 获取轮播图数据
    this.topImage = res.itemInfo.topImages

    // 3. 获取商品信息
    this.goods = new Goods(res.itemInfo, res.columns, res.shopInfo.services)

    // 4. 创建店铺信息的对象
    this.shop = new Shop(res.shopInfo)

    // 5. 保存商品的详情数据
    this.detailInfo = res.detailInfo

    // 6. 获取参数的信息
    this.paramInfo = new GoodsParam(res.itemParams.info, res.itemParams.rule)

    // 7. 获取评论的信息
    if (res.rate.cRate !== 0) {
      this.commentInfo = res.rate.list[0]
    }

    // 8. 获取推荐数据
    this.getRecommendList()

    /*
    // this.$nextTick()
    // 根据最新的数据，对应的DOM是已经渲染出来 但是图片依然没有加载完
    // offsetTop值不对的时候，都是因为图片的问题
    this.$nextTick(() => {
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.param.$el.offsetTop)
      this.themeTopY.push(this.$refs.comment.$el.offsetTop)
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopY)
    })
    */
    this.getThemeTopY = debounce(() => {
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.param.$el.offsetTop)
      this.themeTopY.push(this.$refs.comment.$el.offsetTop)
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopY)
    })
  },
  methods: {
    detailImageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    async getRecommendList() {
      const { data: res } = await getRecommend()
      this.recommend = res.list
    },
    // 监听点击跳到对应内容
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200)
    },
    contentScroll(position) {
      this.isShow = -position.y > 1000
      const length = this.themeTopY.length
      // 获取y值
      const positionY = -position.y
      // 内容滚动，显示正确的标题
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopY[i] && positionY <= this.themeTopY[i + 1]) ||
          (i === length - 1 && positionY >= this.themeTopY[i]))) {
          this.currentIndex = i
        }
      }
      this.$refs.detailBar.currentIndex = this.currentIndex
    },
    // 添加购物车
    addToCart() {
      // 1. 获取购物车需要展示的信息
      const product = {}
      product.iid = this.id
      product.image = this.topImage[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.realPrice = this.goods.realPrice

      // 2. 将商品添加到购物车
      this.$store.dispatch('addCart', product).then(res => {
        this.$toast.show(res)
      })
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('detailImageLoad', () => {
      this.$refs.scroll && refresh()
    })
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    position: absolute;
    top: 40px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .detail-top {
    position: relative;
    z-index: 11;
    background-color: #fff;
  }
</style>
