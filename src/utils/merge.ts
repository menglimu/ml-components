/*
 * @Author: wenlin
 * @Date: 2020-12-23 14:53:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-28 17:46:59
 * @Description: 调用 lodash 的 merge 并自定义合并function的逻辑
 */

import merge from 'webpack-merge'

const customMerge: <T>(...obj: any) => T = merge({
  customizeArray: (a: any, b: any) => b
})

export default customMerge
