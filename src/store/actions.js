import user from "@/api/user";

export default {
  async login({ commit }, login) {
    const res = await user.login(login);
    commit("setToken", res.token);
    commit("setUserInfo", res.userInfo);
    return res;
  },
  async logout({ commit }) {
    const res = await user.logout();
    commit("setToken", "");
    commit("setUserInfo", {});
    return res;
  }
};
