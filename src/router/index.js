import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/available-courses',
    name: 'available-courses',
    component: () => import(/* webpackChunkName: "about" */ '../views/private/AvailableCourses.vue')
  },
  {
    path: '/my-courses',
    name: 'my-courses',
    component: () => import(/* webpackChunkName: "about" */ '../views/private/MyCourses.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
