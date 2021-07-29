/**
 * 回显组件
 */
import { isNull } from "@/utils";
import { InfoColumn } from "types/info";
import Vue from "vue";
import { CreateElement } from "vue/types/umd";

export default Vue.extend({
  name: "MlInfo",
  props: {
    title: String,
    width: { default: "50%" },
    columns: {
      default: (): InfoColumn[] => [],
    },
    data: {
      default: (): AnyObj => ({}),
    },
  },
  methods: {
    renderItem(h: CreateElement, item: InfoColumn) {
      let content =
        typeof item.formatter === "function" ? item.formatter(this.data[item.prop], this.data) : this.data[item.prop];
      return (
        <div
          class={["ml-info-item", item.className, item.width !== "100%" ? "ml-info-ell" : ""]}
          style={{ width: item.width || this.width }}
        >
          <span class="ml-info-label">{item.label}</span>
          {item.render ? (
            item.render(h, item)
          ) : (
            <span v-global-tooltip class="ml-info-value">
              {isNull(content) ? "--" : content}
            </span>
          )}
        </div>
      );
    },
  },
  render(h) {
    return (
      <div class="ml-info-info">
        {this.title ? <div class="ml-info-title">{this.title}</div> : null}
        <div class="ml-info-content">{this.columns.map((item) => this.renderItem(h, item))}</div>
      </div>
    );
  },
});
