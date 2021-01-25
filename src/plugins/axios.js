import axios from "axios";
import store from "@/store";
import { ElMessage } from "element-plus";

export default {
  install: app => {
    axios.defaults.baseURL = "http://localhost:3000";
    app.config.globalProperties.$axios = axios;

    axios.interceptors.request.use(
      config => {
        config.headers["Authorization"] = store.state.token;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        return response.data;
      },
      error => {
        ElMessage({ message: error.message, type: "error" });
        return Promise.reject(error);
      }
    );
  }
};
