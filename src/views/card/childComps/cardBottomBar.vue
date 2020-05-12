<template>
  <div class="bottom-bar">
    <div class="item-selector" @click="checkAll">
      <check-button :is-active="checkedAll"/>
      <span>全选</span>
    </div>
    <div class="total">
      {{getTotal}}
    </div>
    <div class="calculate" @click="jisuan">
      去计算:{{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['checkedAll']),
    getTotal() {
      return '￥' + this.$store.state.cartList
        .filter(item => item.checked)
        .reduce((preValue, item) => {
          return preValue + item.realPrice * item.count
        }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.getters.cartLength
    }
  },
  methods: {
    checkAll() {
      this.$store.state.checkFlag = !this.$store.state.checkFlag
      this.$store.commit('checkAll', this.$store.state.checkFlag)
    },
    jisuan() {
      if (!this.checkLength) return this.$toast.show('请选择商品')
    }
  }
}
</script>

<style lang="less" scoped>
  .bottom-bar {
    background-color: #eee;
    height: 40px;
    position: relative;
    bottom: 0;
    display: flex;
    align-items: center;
    font-size: 14px;
    .total {
      margin-left: 20px;
      color: red;
      flex: 1;
    }
    .calculate {
      width: 90px;
      height: 100%;
      line-height: 40px;
      background-color: red;
      text-align: center;
    }
  }
  .item-selector {
    display: flex;
    align-items: center;
    margin-left: 10px;
    .check-button {
      margin-right: 5px;
    }
  }
</style>
