/**
 * 表单基础
 */
import Vue from "vue";
import { MlFormConfig } from "types/form";

function optionsGet() {
  return Promise.resolve([
    { value: 1, label: "男" },
    { value: 0, label: "女" },
  ]);
}

export default Vue.extend({
  name: "FormBase",
  data() {
    return {
      formConfig: null as MlFormConfig,
      formValue: {},
    };
  },
  created() {
    this.formConfig = {
      columns: [
        {
          label: "姓名",
          prop: "name",
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
        { label: "性别", prop: "sex", type: "select", optionsGet },
        { label: "备注", prop: "marks", type: "textarea", block: true },
      ],
    };
  },
  methods: {},
  render() {
    return <ml-form config={this.formConfig} v-model={this.formValue}></ml-form>;
  },
});
