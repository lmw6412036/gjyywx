/**
 * Created by Administrator on 2017/6/16 0016.
 */
export default {
  install(Vue,options){
    Vue.directive("focus",{
      bind(el){},
      inserted(el){
        el.focus();
      }
    })
  }
}
