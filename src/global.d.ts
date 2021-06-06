/*
 * @Author: wenlin
 * @Date: 2020-06-09 16:25:28
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-28 11:00:27
 * @Description:
 */
// declare function Amap(): any
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
interface AnyObj {
  [key: string]: any
}
declare module '@cci/cui'
declare module '@cci/cp-svg-icon'
// declare module 'AMap'
// declare let AMap: any
// {
//   export default class {

//   }

// }

declare module 'webpack-merge' {
  export default function merge<T>(...obj: any): T
}
