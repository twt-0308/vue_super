import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './gettters'

Vue.use(Vuex)
const state = {
  cartList: [],
  checkFlag: true
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
