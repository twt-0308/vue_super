<template>
  <div class="toast" v-show="isShow">
    <div class="text">{{message}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration = 1500) {
      this.message = message
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: rgba(0,0,0, .6);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    z-index: 99;
  }
</style>
