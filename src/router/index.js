import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/module/Home'
import Story from '@/module/Story'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/story',
      component: Story,
    },
    {
      path: '*',
      component: Home,
      title: '首页',
      redirect: '/'
    }
  ]
})
