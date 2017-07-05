/**
 * Created by 李康飞 on 2017/6/21.
 */
import weui from 'weui.js'
export default {
  install(Vue,options){
    Vue.prototype.$weui=window.weui=weui
  }
}
