/**
 * Created by Administrator on 2017/6/6 0006.
 */
export default [{
  path: '/user/reg',
  component: resolve => {
    require(['./register/index.vue'], resolve)
  }
}]
