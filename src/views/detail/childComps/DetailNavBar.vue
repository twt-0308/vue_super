<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backHandle">
        <img src="~assets/images/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div @click="currentClick(index)" v-for="(item,index) in titles" :key="index" class="title-item" :class="{ active: index === currentIndex }">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    currentClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backHandle() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: pink;
    background-color: white;
  }
  .back img {
    margin-top: 12px;
  }
</style>
