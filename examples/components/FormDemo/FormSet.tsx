/**
 * 表单全局属性配置
 */
import Vue from "vue";
import { MlForm, MlFormConfig } from "types/form";

export default Vue.extend({
  name: "FormRule",
  data() {
    return {
      formConfig: null as MlFormConfig,
      formValue: null,
      setConfig: null as MlFormConfig,
      setValue: null,
    };
  },
  created() {
    this.formConfig = {
      columns: [
        {
          type: "input",
          label: "姓名",
          prop: "name",
        },
        {
          type: "input",
          label: "长度",
          prop: "length",
        },
        {
          type: "select",
          label: "性别",
          prop: "type",
          required: true,
          options: [
            { value: 1, label: "男" },
            { value: 0, label: "女" },
          ],
        },
      ],
    };
    this.setConfig = {
      inline: false,
      columns: [
        {
          type: "radio",
          label: "表单样式",
          prop: "uiType",
          options: [
            { value: "line", label: "line" },
            { value: "round", label: "round" },
            { value: "border", label: "border" },
          ],
        },
        {
          type: "radio",
          label: "行内表单",
          prop: "inline",
          options: [
            { label: "是", value: true },
            { label: "否", value: false },
          ],
        },
        {
          type: "radio",
          label: "标签位置",
          prop: "labelPosition",
          options: [
            { value: "left", label: "左对齐" },
            { value: "right", label: "右对齐" },
            { value: "top", label: "顶部对齐" },
          ],
        },
      ],
    };
  },
  mounted() {
    this.$watch(
      "setValue",
      () => {
        this.formConfig = { ...this.formConfig, ...this.setValue };
      },
      { deep: true },
    );
  },
  methods: {
    onSubmit() {
      let form = this.$refs.form as MlForm;
      form.validate();
    },
  },
  render() {
    return (
      <div>
        <ml-form ref="form" config={this.setConfig} v-model={this.setValue}></ml-form>
        <ml-form ref="form" config={this.formConfig} v-model={this.formValue}></ml-form>
      </div>
    );
  },
});
