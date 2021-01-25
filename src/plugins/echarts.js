import * as echarts from "echarts/lib/echarts";
import { BarChart, LineChart, PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer
]);

export default {
  install: app => {
    app.config.globalProperties.$echarts = echarts;
  }
};
