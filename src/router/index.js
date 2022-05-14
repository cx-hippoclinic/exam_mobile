import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err=>err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import(/* webpackChunkName: "about" */ '../views/Upload.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName: "about" */ '../views/List.vue')
  },
  {
    path: '/file',
    name: 'File',
    component: () => import(/* webpackChunkName: "about" */ '../views/File.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/updatePwd',
    name: 'UpdatePwd',
    component: () => import(/* webpackChunkName: "about" */ '../views/UpdatePwd.vue')
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name === 'File' && !store.state.loginUser.userData) {
    next({name: 'Login',query:{forward: to.path}})
  }
  if (to.name === 'Upload' && !store.state.loginUser.userData) {
    next({name: 'Login',query:{forward: to.path}})
  }
  if (to.name === 'List' && !store.state.loginUser.userData) {
    next({name: 'Login',query:{forward: to.path}})
  }
  if (to.name === 'UpdatePwd' && !store.state.loginUser.userData) {
    next({name: 'Login',query:{forward: to.path}})
  }
  next()
})
export default router
