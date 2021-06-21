/*
 * @Author: wenlin
 * @Date: 2020-05-22 17:55:53
 * @LastEditors: wenlin
 * @LastEditTime: 2021-01-10 18:53:40
 * @Description:
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import { VueConstructor } from 'vue/types/umd';
import MdPage from './md-demo-src.vue';

Vue.use(VueRouter);

let views = []; // 路由菜单，根据views下面的文件自动生成。

interface FileType {
  [key: string]: VueConstructor;
}

// 导入 views 下面的 所有文件
const files: Record<string, FileType> = import.meta.globEager('./views/*');

// 因为通过 import.meta.globEager 返回的列表不能迭代所以直接使用 Object.keys 拿到 key 遍历
Object.keys(files).forEach((key: string) => {
  const component = files[key]?.default;
  let name = key.match(/views\/(.*)\.tsx/)[1];
  // 挂载全局控件
  Vue.component(name, component);
});

export const constantRouterMap = [
  {
    name: 'index',
    path: '/',
    component: () => import('./layout'),
    redirect: '/form/formbase',
    children: [
      {
        name: 'form',
        path: '/form/formbase',
        component: { render: h => <MdPage path="formbase" /> },
        text: '快速上手',
        children: []
      }
    ],
    hidden: true
  }
];

export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  // base: process.env.BASE_URL,
  routes: constantRouterMap
});
