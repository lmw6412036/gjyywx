/**
 * Created by Administrator on 2017/6/5 0005.
 */
export default [{
  path: '/service/book',
  component: resolve => {
    require(['./book/index.vue'], resolve)
  }
}
  , {
    path: '/service/paidui',
    component: resolve => {
      require(['./paidui/index.vue'], resolve)
    }
  }
  , {
    path: '/service/baogao',
    component: resolve => {
      require(['./baogao/index.vue'], resolve)
    }
  }]
