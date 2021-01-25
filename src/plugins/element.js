import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";
import "dayjs/locale/zh-cn";
import "element-plus/lib/theme-chalk/index.css";

export default {
  install: app => {
    app.use(ElementPlus, {
      locale
    });
  }
};
