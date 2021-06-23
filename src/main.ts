/*
 * @Author: wenlin
 * @Date: 2020-01-16 15:48:47
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-28 10:00:00
 * @Description: 导出所有组件
 */

// TODO: 加入webpack 打包浏览器运行代码。 import.meta

import { VueConstructor } from 'vue/types/umd';
// 所有基础组件
import MlTable from './components/BaseTable';
import MlForm from './components/BaseForm';
import MlEcharts from './components/BaseCharts';
import MlEchartsLineArea from './components/BaseCharts/LineArea';
import MlEchartsPieRate from './components/BaseCharts/PieRate';
import MlCascader from './components/CustomCascader';
// 全局组件
import GlobalVideoPlayer from './components/GlobalVideoPlayer';
// 指令
import preventReClick from '@/directives/preventReClick';
import globalTooltip from '@/directives/globalTooltip';

export const components = {
  MlTable,
  MlForm,
  MlEcharts,
  MlEchartsLineArea,
  MlEchartsPieRate,
  MlCascader
};

// 为所有基础组件添加注册方法
Object.values(components).forEach((component: any) => {
  let key = component.options.name;
  components[key].install = function (Vue: VueConstructor, opts = {}) {
    Vue.prototype[key] = opts;
    Vue.component(key, components[key]);
  };
});

// 因为ts和混淆的原因，不能使用name
const install = function (Vue: VueConstructor, opts = {}) {
  Object.values(components).forEach((component: any) => {
    let key = component.options.name;
    Vue.use(component, opts[key]);
  });

  Vue.use(GlobalVideoPlayer);

  Vue.directive('preventReClick', preventReClick);
  Vue.directive('globalTooltip', globalTooltip);
};

export default {
  install,
  ...components,
  GlobalVideoPlayer,
  preventReClick,
  globalTooltip
};
