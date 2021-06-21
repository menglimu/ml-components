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

/** 任意json对象 */
export interface AnyObj {
  [key: string]: any
}

/** 转发所有属性为可选 */
export type Partial<T> = {
  [P in keyof T]?: T[P]
}
