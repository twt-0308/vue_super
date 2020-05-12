export default {
  // mutations 中的每一个方法尽可能完成的事件比较单一
  addCounter(state, payLoad) {
    payLoad.count++
  },
  addToCart(state, payLoad) {
    payLoad.checked = true
    state.cartList.push(payLoad)
  },
  checkAll(state, flag) {
    if (flag) {
      state.cartList.forEach(item => {
        item.checked = true
      })
    } else {
      state.cartList.forEach(item => {
        item.checked = false
      })
    }
  }
}
