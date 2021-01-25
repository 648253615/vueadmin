import axios from "axios";

export default {
  getPermissionList(params) {
    return axios.get("/permissions", { params });
  },
  getPermissionInfo(id) {
    return axios.get(`/permissions/${id}`);
  },
  createPermission(data) {
    return axios.post("/permissions", data);
  },
  updatePermission(id, data) {
    return axios.put(`/permissions/${id}`, data);
  },
  deletePermission(id) {
    return axios.delete(`/permissions/${id}`);
  }
};
