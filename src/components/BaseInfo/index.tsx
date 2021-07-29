/**
 * TODO: 请求接口
 * TODO: 加载中的状态
 * 回显组件
 */
import { isNull } from "@/utils";
import { MlInfoColumn } from "types/info";
import Vue from "vue";
import { CreateElement } from "vue/types/umd";
import { formatterFormValue, getImage } from "../BaseTable/src/columnsContent";
import("./index.scss");

export default Vue.extend({
  name: "MlInfo",
  props: {
    title: String,
    labelWidth: { default: "auto" },
    width: { default: "50%" },
    labelSuffix: { default: "：" },
    columns: {
      default: (): MlInfoColumn[] => [],
    },
    data: {
      default: (): AnyObj => ({}),
    },
    request: { type: Function },
  },
  data() {
    return {
      columns_: [],
      loading: false,
      data_: {},
    };
  },
  async created() {
    // 只在初始化的时候，生成一次columns 会使后面修改的不会生效
    this.columns_ = this.columns.map((column) => {
      if (typeof column.optionsGet === "function") {
        column.options = [];
        column.optionsGet().then((res) => {
          if (Array.isArray(res)) {
            column.options = res;
          }
          if ("content" in res && Array.isArray(res.content)) {
            column.options = res.content;
          }
        });
      }
      return column;
    });
    this.$watch(
      "data",
      () => {
        this.data_ = this.data;
      },
      { immediate: true, deep: true },
    );
    if (this.request) {
      this.loading = true;
      try {
        this.data_ = await this.request();
      } catch (error) {
        this.loading = false;
      }
    }
  },
  methods: {
    // 根据不同类型，获取值
    getValue(h: CreateElement, column: MlInfoColumn) {
      let value = this.data_?.[column.prop];
      if (column.type === "image") {
        value = getImage(value, column, "", h);
      } else if (column.type === "svg") {
        value = <svg-icon class="td-svg" icon-class={value} />;
      } else {
        value = formatterFormValue(value, column);
      }
      return value;
    },
    // 渲染每一项
    renderItem(h: CreateElement, column: MlInfoColumn) {
      let value = this.data_?.[column.prop];

      let content =
        typeof column.formatter === "function" ? column.formatter(value, this.data_) : this.getValue(h, column);
      return (
        <div
          class={["ml-info-item", column.className, column.width !== "100%" ? "ml-info-ell" : ""]}
          style={{ width: column.width || this.width }}
        >
          <span class="ml-info-label" style={{ width: column.labelWidth || this.labelWidth }}>
            {column.label}
            {this.labelSuffix}
          </span>
          {column.render ? (
            column.render(h, column)
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
      <div
        class="ml-info"
        v-loading={this.loading}
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
        attrs={this.$attrs}
      >
        {this.title ? <div class="ml-info-title">{this.title}</div> : null}
        <div class="ml-info-content">{this.columns_.map((item) => this.renderItem(h, item))}</div>
      </div>
    );
  },
});
