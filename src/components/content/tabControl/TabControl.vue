<template>
  <div class="tab-control">
    <div @click="timeClick(index)" class="tab-control-min" :key="index" v-for="(item,index) in titles" :class="{ activeC: index === currentIndex }">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    timeClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  font-size: 15px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  position: sticky;
  top: 44px;
  background-color: #fff;
  z-index: 9;
}
.tab-control-min {
  flex: 1;
}
.activeC {
  color: var(--color-high-text);
}
.activeC span {
  padding: 5px;
}
.activeC span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
