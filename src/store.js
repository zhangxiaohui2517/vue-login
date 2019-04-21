import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userinfo: JSON.parse(localStorage.getItem('userinfo'))

}
const mutations = {

  //保存用户数据
  SAVE_USERINFO(state, userinfo) {
    localStorage.setItem('userinfo',JSON.stringify(userinfo));
    state.userinfo = userinfo
  }
}


export default new Vuex.Store({
  state,
  mutations,
  actions: {

  }
})
