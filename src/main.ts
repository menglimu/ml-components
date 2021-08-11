/*
 * @Author: wenlin
 * @Date: 2020-01-16 15:48:47
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-28 10:00:00
 * @Description: 导出所有组件
 */

// TODO: 加入webpack 打包浏览器运行代码。 import.meta
// TODO: md文档编写

import { VueConstructor } from "vue/types/umd";
// 所有基础组件
import MlTable from "./components/BaseTable";
import MlForm from "./components/BaseForm";
import MlInfo from "./components/BaseInfo";
// 业务组件
// export { default as MlEcharts } from "./components/CustomEcharts";
// export { default as MlEchartsLineArea } from "./components/CustomEcharts/LineArea";
// export { default as MlEchartsPieRate } from "./components/CustomEcharts/PieRate";
// export { default as MlCascader } from "./components/CustomCascader";
// // 全局组件
// export { default as GlobalVideoPlayer } from "./components/GlobalVideoPlayer";
// // 指令
// export { default as globalTooltip } from "@/directives/globalTooltip";
// export { default as clickPreventRe } from "@/directives/clickPreventRe";
// export { default as clickOutside } from "@/directives/clickOutside";
// export { default as clickSubmit } from "@/directives/clickSubmit";
// 需install的组件集合
export const components = [MlTable, MlForm, MlInfo]; //  MlEcharts, MlEchartsLineArea, MlEchartsPieRate, MlCascader

// 为所有基础组件添加注册方法
components.forEach((component: any) => {
  let name = component.options.name;
  component.install = function (Vue: VueConstructor, opts = {}) {
    Vue.prototype[name] = opts;
    Vue.component(name, component);
  };
});

const install = function (Vue: VueConstructor, opts = {}) {
  // 调用所有组件的install方法注入 组件
  components.forEach((component: any) => {
    let name = component.options.name;
    Vue.use(component, opts[name]);
  });

  // Vue.use(GlobalVideoPlayer);

  // Vue.directive("globalTooltip", globalTooltip);
  // Vue.directive("clickPreventRe", clickPreventRe);
  // Vue.directive("clickOutside", clickOutside);
  // Vue.directive("clickSubmit", clickSubmit);
};

export default {
  install,
};

export {
  // 基础组件
  MlTable,
  MlForm,
  MlInfo,
  // // 业务组件
  // MlEcharts,
  // MlEchartsLineArea,
  // MlEchartsPieRate,
  // MlCascader,
  // // 全局组件
  // GlobalVideoPlayer,
  // // 指令
  // globalTooltip,
  // clickPreventRe,
  // clickOutside,
  // clickSubmit,
};
