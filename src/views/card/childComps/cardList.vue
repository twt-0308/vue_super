<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <card-list-item v-for="(item,index) in cartList" :key="index" :cartList="item"/>
    </Scroll>
  </div>
</template>

<script>
import CardListItem from './cardListItem'
import { mapGetters } from 'vuex'
import Scroll from 'components/common/scroll/Scroll'
export default {
  components: {
    Scroll,
    CardListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 47px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
