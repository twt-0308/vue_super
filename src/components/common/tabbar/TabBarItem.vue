<template>
  <div class="tabbar-item" @click="handle" style="flex: 1;">
    <div :class="{ active: isActive }">
      <slot name="item-img"></slot>
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['path'],
  computed: {
    isActive () {
      return this.$route.path.indexOf(this.path) !== -1
    }
  },
  methods: {
    handle () {
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
.tabbar-item div {
  text-align: center;
  height: 49px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.text {
  font-size: 20px;
}
.active {
  color: red;
}
</style>
