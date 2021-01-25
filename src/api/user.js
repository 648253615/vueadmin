import axios from "axios";

export default {
  register(data) {
    return axios.post("/register", data);
  },
  login(data) {
    return axios.post("/login", data);
  },
  logout() {
    return axios.post("/logout");
  },
  getUserList(params) {
    return axios.get("/users", { params });
  },
  getUserInfo(id) {
    return axios.get(`/users/${id}`);
  },
  createUser(data) {
    return axios.post("/users", data);
  },
  updateUser(id, data) {
    return axios.put(`/users/${id}`, data);
  },
  deleteUser(id) {
    return axios.delete(`/users/${id}`);
  }
};
