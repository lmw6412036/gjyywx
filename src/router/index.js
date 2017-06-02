import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => {
        require(['../pages/index.vue'], resolve)
      }
    }
    , {
      path: '/consult',
      component: resolve => {
        require(['../pages/consult/index.vue'], resolve)
      }
    }
    , {
      path: '/user/reg',
      component: resolve => {
        require(['../pages/ucenter/register/index.vue'], resolve)
      }
    }
    , {
      path: '/service/book',
      component: resolve => {
        require(['../pages/service/book/index.vue'], resolve)
      }
    }
    , {
      path: '/service/paidui',
      component: resolve => {
        require(['../pages/service/paidui/index.vue'], resolve)
      }
    }
    , {
      path: '/service/baogao',
      component: resolve => {
        require(['../pages/service/baogao/index.vue'], resolve)
      }
    }
    , {
      path: '/news',
      component: resolve => {
        require(['../pages/news/index.vue'], resolve)
      }
    }
  ]
})
