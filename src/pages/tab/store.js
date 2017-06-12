/**
 * Created by Administrator on 2017/6/8 0008.
 */
const news_t = "news_t"

export default {
  state: {
    t: 1
  },
  mutations: {
    [news_t](state, payload){
      state.t = state.t + payload;
    }
  },
  actions: {
    [news_t]({commit}, payload){
      commit(news_t, payload);
    }
  },
  getters: {
    tt(state){
      return state.t + 2;
    }
  }
}
