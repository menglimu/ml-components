/**
 * @Description: 点击后提交并禁用按钮，展示加载中的状态。防止多次提交  v-clickSubmit={this.onSubmit}
 * @Author: Friends233
 */
import { DirectiveOptions } from "vue/types/umd";

function addLoadingStatus(el: HTMLElement & { disabled?: boolean }) {
  const dom = document.createElement("span");
  dom.id = "btn-directive-loding";
  dom.className += " is-loading";
  dom.style.position = "absolute";
  dom.style.top = "50%";
  dom.style.left = "50%";
  dom.style.transform = "translate(-7px,-7px)";
  dom.innerHTML += '<i class="el-icon-loading"></i>';

  if (el.children?.[0]) {
    const childDom = el.children[0] as any;
    childDom.style.opacity = "0";
  }

  //  el.className += " is-loading";
  //  const dom = '<i class="el-icon-loading"></i>';
  //  el.innerHTML = dom + el.innerHTML;
  el.style.position = "relative";
  el.appendChild(dom);
  el.disabled = true;
}

function removeLoadingStatus(el: HTMLElement & { disabled?: boolean }) {
  //  el.className = el.className.replace(/ is-loading/, "");
  //  el.innerHTML = el.innerHTML.replace(/<i class="el-icon-loading"><\/i>/, "");
  if (el.children?.[0]) {
    const childDom = el.children[0] as any;
    childDom.style.opacity = "1";
  }
  const dom = document.querySelector("#btn-directive-loding") as Node;
  el.removeChild(dom);
  el.disabled = false;
}

const clickSubmit: DirectiveOptions = {
  bind(el: HTMLElement, binding) {
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

export default clickSubmit;
