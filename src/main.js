// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import "weui/dist/style/weui.min.css"
import Bus from "./lib/bus"
import weui from "./lib/wejs"
import Directive from "./lib/directive"
import VueScroller from 'vue-scroller'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
Vue.use(VueScroller)
Vue.use(Bus)
Vue.use(Directive)
Vue.use(weui)

import "babel-polyfill";

Vue.config.productionTip = false

let UA = window.navigator.userAgent.toLocaleLowerCase();
if (/iphone/.test(UA)) {
  window.device = "iphone";
}
if (/android/.test(UA)) {
  window.device = "android";
}
if (/micromessenger/.test(UA)) {
  window.brower = "weixin";
}
/*
* 全局bus
* */
//window.bus=new Vue();


/*
 * 移动端rem布局
 * width:20rem
 * */
if (window.device == "iphone" || window.device == "android") {
  let w = document.body.scrollWidth;
  document.querySelector('html').style.fontSize = (w / 20) + "px";
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  template: '<App/>',
  components: {App}
})
