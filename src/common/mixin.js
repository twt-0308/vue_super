import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      // 控制返回顶部的显示与隐藏
      isShow: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  }
}
