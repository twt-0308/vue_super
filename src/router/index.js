import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const Index = () => import('views/home/index.vue')
const Category = () => import('views/category/Ctegory.vue')
const ShopCar = () => import('views/card/ShopCar.vue')
const Mine = () => import('views/profile/Mine.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/home',
    children: [
      { path: '/home', component: Index },
      { path: '/category', component: Category },
      { path: '/card', component: ShopCar },
      { path: '/profile', component: Mine }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
