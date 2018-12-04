import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Index from '@/components/index'
import Welcome from '@/components/welcome'

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
          path: 'message',
          component: Index
        },
        {
          path: '',
          component: Welcome
        }
      ]
    }
  ]
})
