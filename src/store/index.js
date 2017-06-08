/**
 * Created by Administrator on 2017/6/8 0008.
 */
import Vue from "vue";
import Vuex from 'vuex';
import news from "../pages/news/store"
import user from "../pages/ucenter/store"
import consult from "../pages/consult/store"

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    news, consult, user
  }
})
