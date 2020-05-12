<template>
  <people ref="people">
    <people-item v-for="(item,index) in banner" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </people-item>
  </people>
</template>

<script>
import { People, PeopleItem } from 'components/common/swiper/index.js'
export default {
  name: 'HomeSwiper',
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    People,
    PeopleItem
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>
