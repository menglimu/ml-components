/*
 * @Author: wenlin
 * @Date: 2020-01-16 15:48:47
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-28 10:00:00
 * @Description: 导出所有组件
 */

import MlTable from './ml-table'
import { VueConstructor } from 'vue/types/umd'

import preventReClick from '@/directives/preventReClick'

const components = {
  MlTable
}
// 因为ts和混淆的原因，不能使用name
const install = function (Vue: VueConstructor, opts = {}) {
  for (const key in components) {
    Vue.prototype[key] = opts[key]
    Vue.component(key, components[key])
  }
  Vue.directive('preventReClick', preventReClick)
}
// 为所有组件添加注册方法
for (const key in components) {
  components[key].install = function (Vue: VueConstructor, opts = {}) {
    Vue.prototype[key] = opts
    Vue.component(key, components[key])
  }
}

export default {
  install,
  ...components
}
