/**
 * 表格搜索
 * TODO: 切换隐藏时的动画
 * TODO: 宽度使用固定像素的处理问题。考虑使用dom元素的宽度进行计算
 */
import Vue from "vue";
import { PropType, VNode } from "vue/types/umd";
import { MlFormConfig, MlForm } from "types/form";
import submitClick from "@/directives/clickSubmit";
import { isNull } from "@/utils";
import merge from "@/utils/merge";
// import style from 'index.module.scss'

export default Vue.extend({
  name: "TableSearch",
  directives: { submitClick },
  props: {
    btnType: { type: String, default: "" }, //   cm。城管的隐藏按钮方式
    isOverHide: { type: Boolean, default: undefined }, // 超过一行隐藏
    hideIndex: { type: Number, default: undefined }, // 从第几个开始隐藏。默认会根据 表单的长度进行处理。有不属于表单标准长度的自行传入
    aloneLineBtn: { type: Boolean, default: undefined }, // 展开状态下。按钮是否是独自一行
    removeBtnHight: { type: Boolean, default: false }, // 是否消除按钮单独一行的高度，默认根据外部按钮是否有来进行处理。消除时。会将下面的margin-top 设为 负值
    config: { type: Object as PropType<MlFormConfig> }, // 搜索表单配置
    value: { type: Object as PropType<AnyObj>, required: true },
    // initialValue: { type: Object as PropType<AnyObj> },
    framework: { type: String, default: "element-ui" }, // 'cui' | 'element-ui'
  },
  data() {
    return {
      hided: true,
      aloneLineBtn_: this.aloneLineBtn !== undefined ? this.aloneLineBtn : false,
      isOverHide_: this.isOverHide !== undefined ? this.isOverHide : false,
      hideIndex_: this.hideIndex,
      observer: null,
      btnType_: this.btnType,
    };
  },
  computed: {
    config_(): MlFormConfig {
      let searchFormConfig: any = {
        itemBoxWidth: "25%",
        // labelPosition: "right",
        // labelSuffix: "",
      };
      const set = (this as any).MlTable?.searchConfigDefault;
      if (set?.config) {
        Object.assign(searchFormConfig, set?.config);
      }
      return { ...searchFormConfig, ...this.config };
    },
  },
  created() {
    const defaultOptions = (this as any).MlTable?.searchConfigDefault;
    if (defaultOptions) {
      for (const key in defaultOptions) {
        if (key === "config") {
          continue;
        }
        if (typeof defaultOptions[key] === "object") {
          this[key] = merge(this[key], defaultOptions[key]);
        } else {
          this[key] = defaultOptions[key];
        }
      }
    }
  },
  mounted() {
    this.init();
    // 选择需要观察变动的节点
    const targetNode: any = this.$el.querySelector(".ml-table-search .el-form");

    // 观察器的配置（需要观察什么变动）
    const config = { attributes: false, childList: true, subtree: false };
    // 创建一个观察器实例并传入回调函数
    this.observer = new MutationObserver(this.onDomChange);

    // 以上述配置开始观察目标节点
    this.observer.observe(targetNode, config);
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    init() {
      const num = this.$el.querySelectorAll(".ml-table-search .el-form .ml-form-item-box").length;

      if (!this.removeBtnHight) {
        this.hideIndex_ = 8;
      } else {
        this.hideIndex_ = 5;
      }
      if (num % 4 === 0) {
        this.aloneLineBtn_ = true;
      } else {
        this.aloneLineBtn_ = false;
      }
      if (this.isOverHide === undefined) {
        if (num <= 4) {
          this.isOverHide_ = false;
        } else if (num > 4 && this.removeBtnHight) {
          this.isOverHide_ = true;
        } else if (num > 7 && !this.removeBtnHight) {
          this.isOverHide_ = true;
        }
      }

      if (this.btnType_ === "cm") {
        this.hideIndex_ = 5;
        this.aloneLineBtn_ = false;
        if (num > 4 && this.isOverHide === undefined) {
          this.isOverHide_ = true;
        }
      }

      if (!this.isOverHide_) {
        this.hided = false;
      } else {
        this.hided = true;
      }
    },
    onDomChange() {
      const isHided = this.hided;
      this.init();
      this.hided = isHided;
    },
    reset() {
      (this.$refs.searchForm as MlForm)?.reset();
    },

    onChangeHideStatus() {
      this.hided = !this.hided;
    },

    onSubmit(e: KeyboardEvent) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    },

    onKeyup(e: KeyboardEvent) {
      if (e.key === "Enter") {
        (this.$refs.searchBtn as any)?.$el?.click();
        // this.onSearch_();
      }
    },

    async onSearch_() {
      // 存在搜索项，先校验表单加载完全和表单验证
      try {
        await (this.$refs.searchForm as MlForm)?.validate();
      } catch (error) {
        return;
      }
      // this.$emit("search");
      await (this.$parent as any)?.onSearch();
    },

    async onReset_() {
      (this.$refs.searchForm as MlForm)?.reset();
      // this.$emit("reset");
      await (this.$parent as any)?.onReset();
    },
    renderBtn() {
      const TagButton = { cui: "c-button", "element-ui": "el-button" }[this.framework];
      return this.btnType_ === "cm" ? (
        <div class="search-btn-box">
          {this.isOverHide_ && (
            <TagButton key="arrow" size="small" type="text" onClick={this.onChangeHideStatus} class="arrow">
              {this.hided ? "更多" : "收起"}
              {this.hided ? <i class="el-icon-arrow-down" /> : <i class="el-icon-arrow-up" />}
            </TagButton>
          )}
          <TagButton
            key="search"
            type="primary"
            ref="searchBtn"
            size="small"
            class="search"
            v-submitClick={this.onSearch_}
          >
            查询
          </TagButton>
          <TagButton key="reset" size="small" class="reset" v-submitClick={this.onReset_}>
            重置
          </TagButton>
        </div>
      ) : (
        <div class="search-btn-box">
          <TagButton
            key="search"
            type="primary"
            ref="searchBtn"
            size="small"
            class="search"
            v-submitClick={this.onSearch_}
          >
            查询
          </TagButton>
          <TagButton key="reset" size="small" class="reset" v-submitClick={this.onReset_}>
            重置
          </TagButton>
          {this.isOverHide_ && (
            <TagButton key="arrow" size="small" onClick={this.onChangeHideStatus} class="arrow">
              {this.hided ? <i class="el-icon-arrow-down" /> : <i class="el-icon-arrow-up" />}
            </TagButton>
          )}
        </div>
      );
    },
  },
  render(): VNode {
    if (!this.config_?.columns?.length) {
      return;
    }

    const btn = this.renderBtn();

    // v-preventReClick
    return (
      <div
        class={[
          "ml-table-search",
          "search-label-" + this.config_?.labelPosition,
          "hide-index-" + this.hideIndex_,
          {
            cm: this.btnType_ === "cm",
            "hide-more": this.hided,
            aloneLineBtn: this.aloneLineBtn_,
            removeBtnHight: this.removeBtnHight && this.btnType_ !== "cm",
          },
        ]}
      >
        <ml-form
          nativeOn-keyup={this.onKeyup}
          nativeOn-submit={this.onSubmit}
          ref="searchForm"
          value={this.value}
          // onInput={(e: any) => this.$emit('input', e)}
          {...{ on: this.$listeners }}
          config={this.config_}
          class="search-form"
        >
          {this.btnType_ !== "cm" && btn}
        </ml-form>
        {this.btnType_ === "cm" && btn}
      </div>
    );
  },
});
