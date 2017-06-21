/**
 * Created by Administrator on 2017/6/8 0008.
 */
const news_list = "news_list"
const news_list_total = "news_list_total"

export default {
  state: {
    list: []
  },
  mutations: {
    [news_list](state, payload){
      state.t = state.t + payload;
    }
  },
  actions: {
    [news_list]({commit}, payload){
      commit(news_list, payload);
    }
  },
  getters: {
    [news_list_total](state){
      return state.t + 2;
    }
  }
}
