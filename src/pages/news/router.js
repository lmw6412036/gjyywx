/**
 * Created by Administrator on 2017/6/5 0005.
 */
export default [{
  path: '/news',
  component: resolve => {
    require(['./index.vue'], resolve)
  }
}
];
