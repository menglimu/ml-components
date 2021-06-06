/**
 * 基cui进行二次开发
 * 提供form、table组件
 */

/*
 * @Author: wenlin
 * @Date: 2020-06-01 09:27:44
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-28 15:21:20
 * @Description:  配置的定义
 */
import Vue from 'vue'
import { MlTable } from './table'

/** 任意json对象 */
export interface AnyObj {
  [key: string]: any
}

/** 转发所有属性为可选 */
export type Partial<T> = {
  [P in keyof T]?: T[P]
}

export * from './table'

// export { MlForm, MlTable, MlSelectTree }

export default {
  MlTable,
  install(vue: typeof Vue, options?: AnyObj): void
}
