/*
 * @Author: wenlin
 * @Date: 2020-12-23 14:53:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-28 17:46:59
 * @Description: 调用 lodash 的 merge 并自定义合并function的逻辑
 */

// import { mergeWith, cloneDeep } from 'lodash'

// // 自定义合并function
// function mergeFn(objValue: Function, srcValue: Function) {
//   if (typeof objValue === 'function' && typeof srcValue === 'function') {
//     return function(this: any, ...args: any[]) {
//       objValue.apply(this, args)
//       return srcValue.apply(this, args)
//     }
//   } else if (Array.isArray(objValue) && Array.isArray(srcValue)) {
//     return srcValue
//   }
// }

// const customMerge = function<T>(...args: any[]): T {
//   if (!args || args.length === 0) return
//   if (args.length === 1) {
//     return args[0]
//   } else if (args.length === 2) {
//     return mergeWith(cloneDeep(args[0]), cloneDeep(args[1]), mergeFn)
//   } else if (args.length > 2) {
//     return customMerge(customMerge(args[0], args[1]), ...args.slice(2))
//   }
// }

import merge from 'webpack-merge'

const customMerge: { <T>(...obj: any): T } = merge({
  customizeArray: (a: any, b: any) => b
})

export default customMerge
