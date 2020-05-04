<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1.创建scroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, // 可以点击
      probeType: this.probeType, // 监听滚动位置
      pullUpLoad: this.pullUpLoad // 下拉加载更多
    })
    this.scroll.scrollTo(0, 0)
    // 2. 监听滚动的位置
    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })
    // 3.监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pulling')
    })
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time)
    },
    // 下拉加载多次
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>
