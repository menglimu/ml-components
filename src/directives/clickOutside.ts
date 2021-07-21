import Vue from "vue";
import { on } from "element-ui/src/utils/dom";
import { DirectiveOptions } from "vue/types/umd";

const nodeList: HTMLElement[] = [];
const ctx = "@@clickoutsideContext";

let startClick;
let seed = 0;

!Vue.prototype.$isServer &&
  on(document, "mousedown", e => {
    startClick = e;
  });

!Vue.prototype.$isServer &&
  on(document, "mouseup", e => {
    nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
  });

const createDocumentHandler = (el, binding, vnode) => {
  return function(mouseup: AnyObj = {}, mousedown: AnyObj = {}) {
    if (
      !vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target as Element) ||
      el.contains(mousedown.target as Element) ||
      el === mouseup.target ||
      (vnode.context.popperElm &&
        (vnode.context.popperElm.contains(mouseup.target) || vnode.context.popperElm.contains(mousedown.target)))
    )
      return;

    if (binding.expression && el[ctx].methodName && vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName](el);
    } else {
      el[ctx].bindingFn?.(el);
    }
  };
};

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
const clickOutside: DirectiveOptions = {
  bind(el, binding, vnode) {
    nodeList.push(el);
    const id = seed++;
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value,
    };
  },

  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },

  unbind(el) {
    let len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];
  },
};
export default clickOutside;
