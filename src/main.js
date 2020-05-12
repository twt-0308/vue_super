import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/font_1791257_eg1ly4y6uyn/iconfont.css'
import toast from './components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
// import './common/font'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(toast)
// 解决移动端点击延迟300
FastClick.attach(document.body)
// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/images/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
