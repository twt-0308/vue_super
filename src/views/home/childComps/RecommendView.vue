<template>
  <div class="recommend">
    <div v-for="(item, index) in recommend" :key="index" class="recommend_item">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommend: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  font-size: 13px;
  text-align: center;
  padding: 10px 0 15px;
  border-bottom: 8px solid #eee;
}
.recommend_item {
  flex: 1;
}
.recommend_item img {
  width: 65px;
  height: 65px;
}
</style>
