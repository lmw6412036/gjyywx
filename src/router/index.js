import Vue from 'vue'
import Router from 'vue-router'
import Consult from '../pages/consult/router'
import News from '../pages/news/router'
import Service from '../pages/service/router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => {
        require(['../pages/index.vue'], resolve)
      }
    },
    ...Consult,
    ...Service,
    ...News
  ]
})
