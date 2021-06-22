/*
 * @Author: wenlin
 * @Date: 2020-12-23 14:53:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-28 17:46:59
 * @Description: 调用 lodash 的 merge 并自定义合并function的逻辑
 */

import { mergeWith, cloneDeep } from 'lodash';

const merge = function <T>(...obj: T[]) {
  // 数组的合并方式
  let customMerge = (a, b) => {
    if (b === undefined) {
      return cloneDeep(a);
    }
    Array.isArray(a) && Array.isArray(b) && cloneDeep(b);
  };
  return (
    Object.values(obj)
      // .reverse()
      .reduce((a, b) => mergeWith(a, b, customMerge)) as T
  );
};

export default merge;
