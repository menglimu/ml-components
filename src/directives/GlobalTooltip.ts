/**
 * 全局的tooltip指令，避免重复渲染tooltip组件和文字太短时也进行渲染
 */

import Vue, { DirectiveOptions } from "vue";
import { Tooltip } from "element-ui";

// tooltip 的实例
let tooltip: any = null;
// 挂载tooltip
function mountTooltip() {
  // 创建vue实例
  const Component = Vue.extend(Tooltip);
  const tooltip = new Component({
    propsData: {
      placement: "top-start",
      content: "",
    },
  });
  // 在文档外进行挂载，将虚拟挂载的元素加载到body中
  document.body.appendChild(tooltip.$mount().$el);
}

// 全局指令处理
const directive: DirectiveOptions = {
  bind: function(el: HTMLElement) {
    if (!tooltip) mountTooltip();
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
  },
  unbind: function(el: HTMLElement) {
    el.removeEventListener("mouseenter", onMouseEnter);
    el.removeEventListener("mouseleave", onMouseLeave);
  },
};
// 鼠标进入事件
function onMouseEnter(this: HTMLElement, e: MouseEvent) {
  if (this.clientWidth < this.scrollWidth) {
    tooltip.$props.content = this.innerText || this.textContent;
    tooltip.referenceElm = this;
    tooltip.$refs.popper && (tooltip.$refs.popper.style.display = "none");
    tooltip.doDestroy();
    tooltip.setExpectedState(true);
    tooltip.handleShowPopper();
  }
}
// 鼠标离开事件
function onMouseLeave(this: HTMLElement, e: MouseEvent) {
  tooltip.setExpectedState(false);
  tooltip.handleClosePopper();
}

export default directive;

// Vue.directive('global-tooltip', directive);
