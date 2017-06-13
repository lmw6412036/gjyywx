/**
 * Created by Administrator on 2017/6/13 0013.
 */
export default {
  install(Vue,options){
    Vue.prototype.$bus=window.bus=new Vue()
  }
}
