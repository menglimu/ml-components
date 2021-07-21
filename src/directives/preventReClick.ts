/*
 * @Author: wenlin
 * @Date: 2020-04-28 11:57:41
 * @LastEditors: wenlin
 * @LastEditTime: 2020-06-12 14:38:13
 * @Description:  防止重复点击指令
 */

import { DirectiveOptions } from "vue";

const preventReClick: DirectiveOptions = {
  inserted(el: HTMLElement, value: any) {
    // 判断按钮
    if (el instanceof HTMLButtonElement) {
      el.addEventListener("click", () => {
        if (!el.disabled) {
          el.disabled = true;
          setTimeout(() => {
            el.disabled = false;
          }, value || 500);
        }
      });
    }
  },
};
export default preventReClick;
