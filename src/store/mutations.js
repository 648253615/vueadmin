export default {
  setToken(state, token) {
    state.token = token;
    localStorage.setItem("token", token);
  },
  setUserInfo(state, user) {
    state.userInfo = user;
    localStorage.setItem("userInfo", JSON.stringify(user));
  }
};
