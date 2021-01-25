import { createStore } from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const token = localStorage.getItem("token");
const userInfo = localStorage.getItem("userInfo");

const state = {
  token,
  userInfo: userInfo ? JSON.parse(userInfo) : {}
};

export default createStore({
  state,
  getters,
  mutations,
  actions
});
