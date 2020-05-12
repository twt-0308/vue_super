<template>
  <div class="detail-swiper">
    <people class="imageSwiper">
      <people-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </people-item>
    </people>
  </div>
</template>

<script>
import { People, PeopleItem } from 'components/common/swiper'
export default {
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    People,
    PeopleItem
  }
}
</script>

<style scoped>
  .imageSwiper {
    height: 300px;
  }
</style>
