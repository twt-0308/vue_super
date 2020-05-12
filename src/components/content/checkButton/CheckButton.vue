<template>
  <div class="check-button" :class="{active: isActive}">
    <img src="~assets/images/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .active {
    background-color: red;
    border-color: red;
  }
</style>
