export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  checkedAll(state) {
    const flag = state.cartList.filter(item => item.checked)
    if (flag.length === state.cartList.length && state.cartList.length !== 0) return true
    return false
  }
}
