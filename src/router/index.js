import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Index from '@/components/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/cardPage',
      name: 'Home',
      component: Home,
      children :[
        {
          path: '/',
          component: Index
        }
      ]
    }
  ]
})
