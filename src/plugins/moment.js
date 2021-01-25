import moment from "moment";

export default {
  install: app => {
    moment.locale("zh-cn");
    app.config.globalProperties.$moment = moment;
  }
};
