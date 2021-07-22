/**
 * @Description: 点击后提交并禁用按钮，展示加载中的状态。防止多次提交  v-submitClick={this.onSubmit}
 * @Author: Friends233
 */
import { DirectiveOptions } from "vue/types/umd";

function addLoadingStatus(el: HTMLButtonElement) {
  el.className += " is-loading";
  const dom = '<i class="el-icon-loading"></i>';
  el.innerHTML = dom + el.innerHTML;
  el.disabled = true;
}

function removeLoadingStatus(el: HTMLButtonElement) {
  el.className = el.className.replace(/ is-loading/, "");
  el.innerHTML = el.innerHTML.replace(/<i class="el-icon-loading"><\/i>/, "");
  el.disabled = false;
}

const submitBtn: DirectiveOptions = {
  bind(el: HTMLElement, binding) {
    if (!(el instanceof HTMLButtonElement)) {
      return;
    }
    const fn = async () => {
      try {
        addLoadingStatus(el);
        await binding.value();
      } finally {
        removeLoadingStatus(el);
      }
    };
    el.addEventListener("click", fn);
  },
};

export default submitBtn;
