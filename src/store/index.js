import { createStore } from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const state = {
  token: localStorage.token,
  userInfo: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {}
};

export default createStore({
  state,
  getters,
  mutations,
  actions
});
