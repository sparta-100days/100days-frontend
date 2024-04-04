import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false // 초기에 로그아웃 상태로 설정
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    }
  }
});