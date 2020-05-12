export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找之前的数组中是否有该商品
      const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)
        resolve('添加商品数量加一')
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
  }
}
