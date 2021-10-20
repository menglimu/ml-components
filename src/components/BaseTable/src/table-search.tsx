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
// import style from 'index.module.scss'

export default Vue.extend({
  name: "TableSearch",
  directives: { submitClick },
  props: {
    isBtnInForm: { type: Boolean, default: false }, // 搜索和重置按钮在输入项后显示，！输入项不能占满元素
    isOverHide: { type: Boolean, default: undefined }, // 超过一行隐藏
    hideIndex: { type: Number, default: undefined }, // 从第几个开始隐藏。默认会根据 表单的长度进行处理。有不属于表单标准长度的自行传入
    aloneLineBtn: { type: Boolean, default: undefined }, // 展开状态下。按钮是否是独自一行
    removeBtnHight: { type: Boolean, default: false }, // 是否消除按钮单独一行的高度，默认根据外部按钮是否有来进行处理。消除时。会将按钮使用positionabsolute定位的方式
    config: { type: Object as PropType<MlFormConfig> }, // 搜索表单配置
    value: { type: Object as PropType<AnyObj>, required: true },
    // initialValue: { type: Object as PropType<AnyObj> },
    framework: { type: String, default: "element-ui" }, // 'cui' | 'element-ui'
  },
  data() {
    return {
      showMoreStatus: false,
    };
  },
  computed: {
    config_(this: any): MlFormConfig {
      let searchFormConfig = {
        itemBoxWidth: "25%",
        labelPosition: "right",
        // labelSuffix: "",
      };
      if (this.MlTable?.searchConfigDefault?.config) {
        Object.assign(searchFormConfig, this.MlTable?.searchConfigDefault?.config);
      }
      return { ...searchFormConfig, ...this.config };
    },
    isOverHide_(this: any) {
      return this.isOverHide !== undefined ? this.isOverHide : this.config_?.columns?.length > 4 ? true : false;
    },
    hideIndex_(this: any) {
      if (!isNull(this.hideIndex)) return this.hideIndex;
      let length = 0;
      for (let i = 0; i < this.config_?.columns?.length; i++) {
        const item = this.config_?.columns?.[i];
        const nowLength = parseFloat(item.itemBoxWidth || (item.block && 100) || this.config_?.itemBoxWidth) || 0;
        length += nowLength;
        if (Math.round(length) >= 100) {
          return i + 1;
        }
      }
    },
    aloneLineBtn_(this: any) {
      if (this.aloneLineBtn !== undefined) return this.aloneLineBtn;
      if (this.config_?.columns?.[this.config_?.columns?.length - 1]?.itemBoxWidth === "auto") return false;
      const allLength = Math.round(
        this.config_?.columns?.reduce((val, item) => {
          const nowLength = parseFloat(item.itemBoxWidth || (item.block && 100) || this.config_?.itemBoxWidth) || 0;
          let all = val + nowLength;
          if (val < 100 && all > 100) {
            return nowLength;
          }
          if (all > 100) {
            return all - 100;
          }
          return all;
        }, 0)
      );
      if (allLength % 100 === 0) {
        return true;
      }
    },
  },
  created() {
    if (this.isOverHide_) {
      this.showMoreStatus = true;
    }
  },
  methods: {
    reset() {
      (this.$refs.searchForm as MlForm)?.reset();
    },

    onChangeHideStatus() {
      this.showMoreStatus = !this.showMoreStatus;
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
  },
  render() {
    if (!this.config_?.columns?.length) {
      return;
    }

    const TagButton = { cui: "c-button", "element-ui": "el-button" }[this.framework];
    const btn = (
      <div class="search-btn-box">
        <TagButton type="primary" ref="searchBtn" class="search" v-submitClick={this.onSearch_}>
          查询
        </TagButton>
        <TagButton class="reset" v-submitClick={this.onReset_}>
          重置
        </TagButton>
        {this.isOverHide_ && (
          <TagButton onClick={this.onChangeHideStatus} class="arrow">
            {this.showMoreStatus ? <i class="el-icon-arrow-down" /> : <i class="el-icon-arrow-up" />}
          </TagButton>
        )}
      </div>
    );

    // v-preventReClick
    return (
      <div
        class={[
          "ml-table-search",
          "search-label-" + this.config_?.labelPosition,
          "hide-index-" + (this.hideIndex_ + 1),
          {
            "hide-more": this.showMoreStatus,
            "btn-in-form": this.isBtnInForm,
            aloneLineBtn: this.aloneLineBtn_,
            removeBtnHight: this.removeBtnHight,
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
          {/* {!(this.isOverHide_ && this.showMoreStatus) && btn} */}
          {/* {(!this.showMoreStatus || this.isBtnInForm) && btn} */}
          {btn}
        </ml-form>
        {/* {this.showMoreStatus && !this.isBtnInForm && btn} */}
      </div>
    );
  },
});
