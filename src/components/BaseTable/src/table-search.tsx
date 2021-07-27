/**
 * 表格搜索
 */
import Vue from "vue";
import { PropType, VNode } from "vue/types/umd";
import { MlFormConfig, MlForm } from "types/form";
import submitClick from "@/directives/submitClick";
// import style from 'index.module.scss'

export default Vue.extend({
  name: "TableSearch",
  directives: { submitClick },
  props: {
    isBtnInForm: { type: Boolean, default: false }, // 搜索和重置按钮在输入项后显示，！输入项不能占满元素
    isOverHide: { type: Boolean, default: undefined }, // 超过一行隐藏
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
    isOverHide_(this: any) {
      return this.isOverHide !== undefined ? this.isOverHide : this.config?.columns?.length > 3 ? true : false;
    },
  },
  created() {
    if (this.isOverHide_) {
      this.showMoreStatus = true;
    }
  },
  methods: {
    getSize() {
      return this.config.size || (this.$refs.searchForm && (this.$refs.searchForm as any).config_.size) || "";
    },

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
    if (!this.config || !this.config.columns || this.config.columns.length === 0) {
      return;
    }

    const size = this.getSize();
    const TagButton = { cui: "c-button", "element-ui": "el-button" }[this.framework];
    const btn = (
      <div class="search-btn-box">
        <TagButton type="primary" ref="searchBtn" class="search" size={size} v-submitClick={this.onSearch_}>
          查询
        </TagButton>
        <TagButton class="reset" size={size} v-submitClick={this.onReset_}>
          重置
        </TagButton>
        {this.isOverHide_ && (
          <TagButton onClick={this.onChangeHideStatus} size={size}>
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
          {
            "hide-more": this.showMoreStatus,
            "btn-in-form": this.isBtnInForm,
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
          config={this.config}
          class="search-form"
        >
          {this.isBtnInForm && !(this.isOverHide_ && this.showMoreStatus) && btn}
        </ml-form>
        {(!this.isBtnInForm || (this.isOverHide_ && this.showMoreStatus)) && btn}
      </div>
    );
  },
});
