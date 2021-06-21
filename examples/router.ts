/*
 * @Author: wenlin
 * @Date: 2020-05-22 17:55:53
 * @LastEditors: wenlin
 * @LastEditTime: 2021-01-10 18:53:40
 * @Description:
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import { RouteConfigSingleView, RouteConfig, RouterOptions } from 'vue-router/types/router';

Vue.use(VueRouter);

export interface MlRouterConfig extends RouteConfigSingleView {
  hidden?: boolean;
  icon?: string;
  text?: string;
  children?: MlRouterConfig[];
}

export const constantRouterMap: Array<MlRouterConfig> = [
  {
    name: 'index',
    path: '/',
    component: () => import('./layout/index.vue'),
    redirect: '/form/form',
    children: [
      {
        name: 'form',
        path: '/form/form',
        component: () => import('./mds/form/快速上手.md'),
        text: '快速上手',
        children: []
      },
      {
        name: 'form1',
        path: '/form/form1',
        component: () => import('./mds/form/典型表单.md'),
        text: '典型表单',
        children: []
      },
      {
        name: 'form2',
        path: '/form/form2',
        component: () => import('./mds/form/行内表单.md'),
        text: '行内表单',
        children: []
      },
      {
        name: 'form3',
        path: '/form/form3',
        component: () => import('./mds/form/对齐方式.md'),
        text: '对齐方式',
        children: []
      },
      {
        name: 'form4',
        path: '/form/form4',
        component: () => import('./mds/form/表单验证.md'),
        text: '表单验证',
        children: []
      },
      {
        name: 'form5',
        path: '/form/form5',
        component: () => import('./mds/form/自定义校验规则.md'),
        text: '自定义校验规则',
        children: []
      },
      {
        name: 'form6',
        path: '/form/form6',
        component: () => import('./mds/form/动态增减表单项.md'),
        text: '动态增减表单项',
        children: []
      },
      {
        name: 'form7',
        path: '/form/form7',
        component: () => import('./mds/form/表单内组件尺寸控制.md'),
        text: '表单内组件尺寸控制',
        children: []
      },
      {
        name: 'form8',
        path: '/form/form8',
        component: () => import('./mds/form/表单风格.md'),
        text: '表单风格',
        children: []
      },
      {
        name: 'form9',
        path: '/form/form9',
        component: () => import('./mds/form/表单render函数使用.md'),
        text: '表单render函数使用',
        children: []
      },
      {
        name: 'form10',
        path: '/form/form10',
        component: () => import('./mds/form/配置项.md'),
        text: '配置项',
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
  base: process.env.BASE_URL,
  routes: constantRouterMap
});
