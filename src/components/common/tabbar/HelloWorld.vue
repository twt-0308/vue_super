<template>
  <div>
    <div id="tabbar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<style scoped>
#tabbar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -2px 10px rgba(0,0,0,.1);
  z-index: 10;
}
</style>
