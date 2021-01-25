import axios from "axios";

export default {
  getRoleList(params) {
    return axios.get("/roles", { params });
  },
  getRoleInfo(id) {
    return axios.get(`/roles/${id}`);
  },
  createRole(data) {
    return axios.post("/roles", data);
  },
  updateRole(id, data) {
    return axios.put(`/roles/${id}`, data);
  },
  deleteRole(id) {
    return axios.delete(`/roles/${id}`);
  }
};
